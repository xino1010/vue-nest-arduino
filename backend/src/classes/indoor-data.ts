export class IndoorData {

  public humidity: number;
  public temperature: number;
  public light: boolean;
  public higrometer: number;
  public waterLevel: number;

  constructor() {
    this.humidity = 0;
    this.temperature = 0;
    this.light = false;
    this.higrometer = 0;
    this.waterLevel = 0;
  }
}
