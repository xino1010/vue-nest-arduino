import {IndoorData} from '../classes/indoor-data';

export interface ArduinoSerialData {
  error: boolean;
  type?: string;
  data?: IndoorData;
  message?: string;
}
