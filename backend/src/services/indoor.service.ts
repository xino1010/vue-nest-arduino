import {Injectable} from '@nestjs/common';
import {Dht22Data} from '../classes/dht22-data';
import {IndoorData} from '../classes/indoor-data';

@Injectable()
export class IndoorService {

  private indoorData: IndoorData;

  constructor() {
    this.indoorData = new IndoorData();
  }

  public getIndoorData(): IndoorData {
    return this.indoorData;
  }

  public async updateIndoorData() {
    await this.changeLightStatus();
    await this.refreshTemperatureAndHumidity();
    await this.refreshSoilMoisture();
  }

  public changeLightStatus(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.indoorData.light = !this.indoorData.light;
      resolve(this.indoorData.light);
    });
  }

  public refreshTemperatureAndHumidity(): Promise<Dht22Data> {
    return new Promise<Dht22Data>((resolve) => {
      this.indoorData.dht22Data.humidity = this.getRandomNumberBetweenInterval(0, 100);
      this.indoorData.dht22Data.temperature = this.getRandomNumberBetweenInterval(0, 45);
      resolve(this.indoorData.dht22Data);
    });
  }

  public refreshSoilMoisture(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.indoorData.wet = false;
      resolve(this.indoorData.wet);
    });
  }

  private getRandomNumberBetweenInterval(min: number, max: number): number {
    return Math.random() * (+max - +min) + +min;
  }

}
