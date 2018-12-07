import {ArduinoSerialData} from '../interfaces/arduino-serial-data';
import {IndoorData} from '../classes/indoor-data';
import {Injectable, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import * as SerialPort from 'serialport';

const Readline = require('@serialport/parser-readline');

@Injectable()
export class IndoorService {

  readonly baudRate: number = 115200;
  public indoorDataObservable: Observable<IndoorData>;
  readonly path: string = '/dev/ttyACM0';
  private serialPort: SerialPort;

  constructor() {
    this.connectToSerialPort();
  }

  private connectToSerialPort(): void {
    this.serialPort = new SerialPort(this.path, {
      baudRate: this.baudRate,
    }, (err: any) => {
      if (err) {
        Logger.log(`An error occurred opening '${this.path}' using baudrate ${this.baudRate}`, IndoorService.name);
        Logger.log(err, IndoorService.name);
      } else {
        Logger.log(`Serial port '${this.path}' opened using baudrate ${this.baudRate}`, IndoorService.name);
      }
    });
    const parser = this.serialPort.pipe(new Readline({delimiter: '\r\n'}));
    this.indoorDataObservable = new Observable((observer) => {
      parser.on('data', (data: string) => {
        const serialData: ArduinoSerialData = this.isJsonString(data);
        if (serialData != null) {
          if (!serialData.error) {
            const indoorData = new IndoorData();
            indoorData.humidity = serialData.data.humidity;
            indoorData.temperature = serialData.data.temperature;
            indoorData.light = serialData.data.light;
            indoorData.higrometer = serialData.data.higrometer;
            indoorData.waterLevel = serialData.data.waterLevel;
            Logger.log(indoorData, IndoorService.name);
            observer.next(indoorData);
          } else {
            Logger.log(serialData.message, IndoorService.name);
            observer.next(null);
          }
        }
      });
    });
  }

  public toggleLight(): void {
    const action: any = {action: 'light'};
    this.serialPort.write(JSON.stringify(action), (err: any) => {
      if (err) {
        Logger.log(`An error occurred toggling light ${err}`, IndoorService.name);
      } else {
        Logger.log(`Toggle light action sent`, IndoorService.name);
      }
    });
  }

  private isJsonString(str: string): any {
    try {
      const o: any = JSON.parse(str);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (err) {
    }
    return null;
  }


}
