// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  typeformUrl: 'https://api.typeform.com/v1/form/r2Bfb0?key=081562f9fd86f05daead132e235ccc15671b0253',
  firebase: {
    apiKey: 'AIzaSyDczk8Y80QtYKsEjfXE_DhtDhvVz6SHff4',
    authDomain: 'canworkadmin.firebaseapp.com',
    databaseURL: 'https://canworkadmin.firebaseio.com',
    projectId: 'canworkadmin',
    storageBucket: 'canworkadmin.appspot.com',
    messagingSenderId: '492032276666'
  },
  daoApiUrl: 'http://localhost:5000/candao-af747/us-central1/api',
  daoApiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImJtVjNZMnhwWlc1ME1V' +
    'Qm5iV0ZwYkM1amIyMD0iLCJ0aW1lc3RhbXAiOjE1Mjg0MjI0MjI2NTN9.3i8tLb5HkUm39ASr46vh_mBqHG4etbMRfLri22YILgY'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
