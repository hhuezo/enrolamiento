// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // HOST: 'http://172.31.65.26:9090/api',
  // HOST_LOGIN: 'http://172.31.65.26:9090',
  HOST: 'http://localhost:9090/api',
  HOST_LOGIN: 'http://localhost:9090',
  // HOST: 'https://www.em.com.sv/api',
  // HOST_LOGIN: 'https://www.em.com.sv',
  

  HOST_HUELLA: 'http://localhost:8091/dermalog-reader',
  //HOST_HUELLA2: 'http://afis.sertracen.com.sv:8090/dermalog',
  HOST_HUELLA2: 'http://localhost:8090/dermalog',
  //HOST: 'https://www.em.com.sv/babson-maps-backend/api', 
  //HOST: 'https://www.em.com.sv/proyectos/public/babson-maps-backend/api', //ok
  //HOST_TEMP: ' http://172.31.65.26:8080/esquelassqlservices2/correo'   
  HOST_TEMP: 'https://www.sertracen.com.sv/esquelassqlservices/correo'      
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
