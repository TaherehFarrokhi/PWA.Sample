
import * as express from 'express';
import {Application} from 'express';
import {addPushSubscriber} from './add-push-subscriber.route';
import {sendNotification} from './send-notifications.route';
const bodyParser = require('body-parser');

const webpush = require('web-push');

const vapidKeys = {
  'publicKey': 'BAKofr6E9SC4av1QXJtIA237oJeLennKfhf4KGlkwIkuZLAeWdIP3N_p-QlZJMr6-akrQ1Yie7pHjndzL1r5Yo0',
  'privateKey': 'QdtF19E85K84HS5HSG-q9HwkAxISM-Kfz175eX9AopE'
};

webpush.setVapidDetails(
    'mailto:tfarrokhi@sportingindex.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app: Application = express();
app.use(bodyParser.json());

// REST API
app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/changes')
    .post(sendNotification);

// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});









