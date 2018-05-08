# PWA sample (sampleapp1)

This project is a working sample for PWA application using Angular Service Worker and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## How to run it 

This needs to run as a client and api which api is responsible to provide push notification using web-push library. 

As the Service Worker in Angular can only work in production mode, there is a need for a development http server which can be installed using:
```
npm i -g http-server
```

Or using yarn
```
yarn add global http-server
```

The **http-server** is used to serve the client app. To run the server and client run the following commands 
```
npm run server
npm run start:prod
```

Or using yarn
```
yarn server
yarn start:prod
```

Now with browsing to http://127.0.01:8080 you will have access to PWA application.

### Application Update
After the first browsing, if anything changes in the client application, with the first reload a dialog will appear that indicate the new version available.

![](images/image.png)

### Push notification
There are two buttons in home screen which the first one is for subscription to push notification and with the second one it send a short message to the server which then bing send as notification to the client.


