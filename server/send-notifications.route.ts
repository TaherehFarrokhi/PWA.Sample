import {USER_SUBSCRIPTIONS} from './in-memory-db';

const webpush = require('web-push');

export function sendNotification(req, res) {

    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    // sample notification payload
    const notificationPayload = {
        'notification': {
            'title': 'Command Result',
            'body': 'Command result is available',
            'icon': 'assets/icon-144x144.png',
            'vibrate': [100, 50, 100],
            'data': {
                'dateOfArrival': Date.now(),
                'primaryKey': 1
            },
            'actions': [{
                'action': 'explore',
                'title': 'Go to the site'
            }]
        }
    };

    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Command result sent successfully.'}))
        .catch(err => {
            console.error('Error sending command result, reason: ', err);
            res.sendStatus(500);
        });
}

