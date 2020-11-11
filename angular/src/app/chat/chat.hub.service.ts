import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/models/models';
import { SessionService } from 'src/app/shared';
import Echo from 'laravel-echo';
import { PusherConnector } from 'laravel-echo/dist/connector';
import echoOptions from '../../../../assets/json/echoOptions.json';

import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
(window as any).Pusher = Pusher;

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  newMessage = new Subject<Message>();
  // updateNotifFromChatComponent = new Subject <number>();
  // notificationReceived = new Subject<any>();

  private echo: Echo;

  constructor(private session: SessionService, @Inject('BASE_URL') protected baseUrl: string) { }


  public createConnection() {
    const o2: IEchoOption = environment.production ? echoOptions.prod : echoOptions.dev;
    o2.auth.headers.Authorization += this.session.token;

    const options = {
      broadcaster: 'pusher',
      authEndpoint: `${this.baseUrl}/api/broadcasting/auth`,
      auth: {
        Accept: 'application/json',
        headers: { Authorization: `Bearer ${this.session.token}` }
      },
      key: '454c',
      wsHost: window.location.hostname, // .replace('https://', '').replace('http://', '').replace(':8000', ''),
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      // cluster: 'mt1',
      enabledTransports: ['ws', 'wss'],
      disableStats: true,
      encrypted: false,
    };

    this.echo = new Echo(echoOptions.dynamic ? options : o2);

    // this.echo.connect();

    console.warn(this.echo.options)

    return this;
  }

  public startConnection(): void {

    // const connector: PusherConnector = this.echo.connector;
    // // this.echo.private(`App.User.${this.session.user.id}`).listen('MessageEvent', r => {
    // //   console.log(r);
    // // });
    // connector.connect();

    // connector.privateChannel(`private.${this.session.user.id}`).listen('MessageEvent', r => {
    //   console.warn('fanaly its works  echo.channel');
    // });

    // connector.channel(`users.${this.session.user.id}`).listen('MessageEvent', r => {
    //   console.warn('fanaly its works  channel(`users');
    // });

    // connector.presenceChannel(`private.${this.session.user.id}`).here( r => {
    //   console.warn('fanaly its works  echo.channel');
    // });

    // // console.warn(connector)

    // this.echo.listen(`private.${this.session.user.id}`, 'MessageEvent' , r => {
    //   console.warn('fanaly its works  echo.listen');
    // });

    // // this.echo.private(`private.${this.session.user.id}`).listen('MessageEvent', r => {
    // //   console.log(r);
    // // });

    // this.echo.channel(`private.${this.session.user.id}`).listen('MessageEvent', r => {
    //   console.warn('fanaly its works  echo.channel');
    // });

    this.echo.channel(`users.${this.session.user.id}`).listen('MessageEvent', r => {
      this.newMessage.next(r.message);
    });
  }

  public stopConnection() {
    this.echo.disconnect();
  }

}

interface IEchoOption {
  broadcaster: string;
  authEndpoint: string;
  auth: {
    Accept: string;
    headers: {
      Authorization: string;
    };
  };
  key: string;
  wsHost: string;
  wsPort: number;
  wssPort: number;
  forceTLS: boolean;
  enabledTransports?: string[];
  disableStats: boolean;
  encrypted: boolean;
}
