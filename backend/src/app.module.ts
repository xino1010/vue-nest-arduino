import {Module} from '@nestjs/common';
import {IndoorService} from './services/indoor.service';
import {AppService} from './app.service';
import {WebsocketService} from './services/websocket.service';

@Module({
  imports: [],
  providers: [
    AppService,
    IndoorService,
    WebsocketService,
  ],
})
export class ApplicationModule {
}
