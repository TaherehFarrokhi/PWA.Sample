import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  message = 'sample text';

  constructor(private swUpdate: SwUpdate,
    private swPush: SwPush,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.checkUpdates();
  }

  checkUpdates() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
              window.location.reload();
          }
      });
    }
  }

  subscribeToNotifications(): any {
    const VAPID_PUBLIC_KEY = 'BAKofr6E9SC4av1QXJtIA237oJeLennKfhf4KGlkwIkuZLAeWdIP3N_p-QlZJMr6-akrQ1Yie7pHjndzL1r5Yo0';

    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC_KEY
      })
      .then(sub => {
        console.log('Register for push notification subscription', sub);

        this.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err =>  console.log('Could not send subscription object to server, reason: ', err)
        );
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }

  private addPushSubscriber(sub: any) {
    return this.http.post('/api/notifications', sub);
  }

 send() {
    return this.http.post('/api/changes', null).toPromise().then(res => console.log('command sent'));
  }
}
