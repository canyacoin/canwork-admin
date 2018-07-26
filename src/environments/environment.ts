// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  typeformUrl: 'https://api.typeform.com/v1/form/r2Bfb0?key=081562f9fd86f05daead132e235ccc15671b0253',
  backendURI: 'http://localhost:5000/staging-can-work/us-central1',
  firebase: {
    apiKey: 'AIzaSyCBkE8UV7x60XzZp-KrX-KYIz7lOdNd9Po',
    authDomain: 'staging-can-work.firebaseapp.com',
    databaseURL: 'https://staging-can-work.firebaseio.com',
    projectId: 'staging-can-work',
    storageBucket: 'staging-can-work.appspot.com',
    messagingSenderId: '320531765618'
    // apiKey: 'AIzaSyDczk8Y80QtYKsEjfXE_DhtDhvVz6SHff4',
    // authDomain: 'canworkadmin.firebaseapp.com',
    // databaseURL: 'https://canworkadmin.firebaseio.com',
    // projectId: 'canworkadmin',
    // storageBucket: 'canworkadmin.appspot.com',
    // messagingSenderId: '492032276666'
  },
  daoApiUrl: 'http://localhost:5000/candao-af747/us-central1/api',
  daoApiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFtOW9ia0JrWVc'
    + '4dVkyOXQiLCJ0aW1lc3RhbXAiOjE1MzExMTcyMDUyMDB9.gfoXrLf-8MvVsDp4V3RXhG4fg3PcSIWonkswbvb1epc',
  contracts: {
    useTestNet: true,
    network: 'ropsten',
    local: {
      canwork: '0x870ad43c01e7fd9879fd00f2839b655c29d6908e',
      canworkAdmin: '0x75bfa6e92899118b46416e2a71608001c19debf1',
      canyaCoin: '0x3986826916e72cf07c278300b9525dc32a29f259'
    },
    ropsten: {
      canwork: '0xe2f357d3a4b9147e053773b967040f0f63d42d1d',
      canworkAdmin: '0x6c407ec9d6477f487e64885ed2780dcc8836dc75',
      canyaCoin: '0xee9154ab6366416e80a1eb718954abe2ae406274',
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
