import {Dht22Data} from './dht22-data';

export class IndoorData {

  public dht22Data: Dht22Data;
  public light: boolean;
  public wet: boolean;

  constructor() {
    this.dht22Data = new Dht22Data();
    this.light = false;
    this.wet = false;
  }
}
