import {IndoorData} from '../classes/indoor-data';
import {Injectable, Logger} from '@nestjs/common';
import * as SerialPort from 'serialport';
import {ArduinoSerialData} from '../interfaces/arduino-serial-data';

const Readline = require('@serialport/parser-readline');

@Injectable()
export class IndoorService {

  readonly baudRate: number = 115200;
  readonly path: string = '/dev/ttyACM0';
  private indoorData: IndoorData;
  private serialPort: SerialPort;

  constructor() {
    this.indoorData = new IndoorData();
    this.serialPort = new SerialPort(this.path, {
      baudRate: this.baudRate,
    }, (err: any) => {
      if (err) {
        Logger.log(`An error occurred opening '${this.path}' using baudrate ${this.baudRate}`, IndoorService.name);
        Logger.log(err, IndoorService.name);
        return;
      } else {
        Logger.log(`Serial port '${this.path}' opened using baudrate ${this.baudRate}`, IndoorService.name);
      }
    });
    const parser = this.serialPort.pipe(new Readline({delimiter: '\r\n'}));
    parser.on('data', (data: string) => {
      const serialData: ArduinoSerialData = this.isJsonString(data);
      if (serialData != null) {
        if (!serialData.error) {
          this.indoorData.humidity = serialData.data.humidity;
          this.indoorData.temperature = serialData.data.temperature;
          this.indoorData.light = serialData.data.light;
          this.indoorData.higrometer = serialData.data.higrometer;
          Logger.log(this.indoorData, IndoorService.name);
        } else {
          this.indoorData.humidity = -1;
          this.indoorData.temperature = -1;
          this.indoorData.light = false;
          this.indoorData.higrometer = -1;
          Logger.log(serialData.message, IndoorService.name);
        }
      }
    });
  }

  public getIndoorData(): IndoorData {
    return this.indoorData;
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
