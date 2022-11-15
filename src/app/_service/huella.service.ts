import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestBuscarHuella } from '../_model/requestBuscarHuella';
import { RequestInsertarHuella } from '../_model/requestInsertarHuella';
import { RequestValidarHuella } from '../_model/requestValidarHuella';
<<<<<<< HEAD
=======
import { ResponseIniciarHuella } from '../_model/responseIniciarHuella';
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

@Injectable({
  providedIn: 'root'
})
export class HuellaService {

  private url_iniciar_huella: string = `${environment.HOST_HUELLA}/start`;
  private url_leer_huella: string = `${environment.HOST_HUELLA}/capture`;
  private url_detener_huella: string = `${environment.HOST_HUELLA}/stop`;
<<<<<<< HEAD
  //private url_buscar_huella: string = `${environment.HOST_HUELLA2}/search`;
  //private url_insertar_huella: string = `${environment.HOST_HUELLA2}/insert`;
  //private url_validar_huella: string = `${environment.HOST_HUELLA2}/verify`;
=======
  private url_buscar_huella: string = `${environment.HOST_HUELLA2}/search`;
  private url_insertar_huella: string = `${environment.HOST_HUELLA2}/insert`;
  private url_validar_huella: string = `${environment.HOST_HUELLA2}/verify`;
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  private requestBuscarHuella?: RequestBuscarHuella;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  iniciarHuella(){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"fingerPrint":"${requestBuscarHuella.fingerPrint}","position":"${requestBuscarHuella.position}"}`;

//console.log('esta es el body iniciar huella '+body);
console.log('esta es la url iniciar huella '+this.url_iniciar_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_iniciar_huella, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  leerHuella(){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"fingerPrint":"${requestBuscarHuella.fingerPrint}","position":"${requestBuscarHuella.position}"}`;

//console.log('esta es el body iniciar huella '+body);
console.log('esta es la url leer huella '+this.url_leer_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_leer_huella, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  detenerHuella(){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"fingerPrint":"${requestBuscarHuella.fingerPrint}","position":"${requestBuscarHuella.position}"}`;

//console.log('esta es el body iniciar huella '+body);
console.log('esta es la url detener huella '+this.url_detener_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_detener_huella, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }

<<<<<<< HEAD
/*
=======

>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  buscarHuella(requestBuscarHuella: RequestBuscarHuella){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"fingerPrint":"${requestBuscarHuella.fingerPrint}","position":"${requestBuscarHuella.position}"}`;

console.log('esta es el body buscar huella '+body);
console.log('esta es la url buscar huella '+this.url_buscar_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_buscar_huella, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }
<<<<<<< HEAD
*/
/*
=======


>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  insertarHuella(requestInsertarHuella: RequestInsertarHuella){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"identifier":"${requestInsertarHuella.identifier}",{"fingerPrint":"${requestInsertarHuella.fingerPrint}","position":"${requestInsertarHuella.position}"}`;

console.log('esta es el body insertar huella '+body);
console.log('esta es la url insertar huella '+this.url_insertar_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_insertar_huella, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }
<<<<<<< HEAD
*/
/*
=======


>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  validarHuella(requestValidarHuella: RequestValidarHuella){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"identifier":"${requestValidarHuella.identifier}",{"fingerPrint":"${requestValidarHuella.fingerPrint}","position":"${requestValidarHuella.position}"}`;

console.log('esta es el body validar huella '+body);
console.log('esta es la url validar huella '+this.url_validar_huella);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_validar_huella, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }
<<<<<<< HEAD
*/
=======

>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

}