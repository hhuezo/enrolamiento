import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonaService {

  private url: string = '';
  private url_obtener_tmp_datos_persona: string = `${environment.HOST_LOGIN}/api/persona/guardar`;
  private url_tmp_datos_personales_crear: string = `${environment.HOST_LOGIN}/api/tmp_datos_personales/crear`;
  private url_tmp_datos_personales_update: string = `${environment.HOST_LOGIN}/api/tmp_datos_personales/guardar`;
  private url_tmp_datos_fisicos: string = `${environment.HOST_LOGIN}/api/tmp_datos_fisicos/guardar`;
  private url_tmp_datos_demograficos: string = `${environment.HOST_LOGIN}/api/tmp_datos_demograficos/guardar`;
  private url_tmp_datos_firma: string = `${environment.HOST_LOGIN}/api/tmp_datos_firma/guardar`;
  private url_tmp_datos_foto: string = `${environment.HOST_LOGIN}/api/tmp_datos_foto/guardar`;
  private url_tmp_datos_persona: string = `${environment.HOST_LOGIN}/api/tmp_datos_personas/obtener_persona/`;


  private requestDatosPersona?: RequestDatosPersona;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /*
  guardarPersona(requestDatosPersona: RequestDatosPersona) {

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"nombre":"${requestDatosPersona.nombre}","ape_materno":"${requestDatosPersona.ape_materno}","ape_paterno":"${requestDatosPersona.ape_paterno}","ape_casada":"${requestDatosPersona.ape_casada}","fecha_emision_dui":"${requestDatosPersona.fecha_emision_dui}","dui":"${requestDatosPersona.dui}","email":"${requestDatosPersona.email}","genero":"${requestDatosPersona.genero}","fecha_vto_dui":"${requestDatosPersona.fecha_vto_dui}","telefono_celular":"${requestDatosPersona.telefono_celular}","anteojos":"${requestDatosPersona.anteojos}","audifonos":"${requestDatosPersona.audifonos}","senales_especiales":"${requestDatosPersona.senales_especiales}","peso_libras":"${requestDatosPersona.peso_libras}","lentes_contacto":"${requestDatosPersona.lentes_contacto}","estatura":"${requestDatosPersona.estatura}","fecha_nacimiento":"${requestDatosPersona.fecha_nacimiento}","lugar_nacimiento":"${requestDatosPersona.lugar_nacimiento}","municipio":"${requestDatosPersona.municipio}","pais_nacimiento":"${requestDatosPersona.pais_nacimiento}","domicilio":"${requestDatosPersona.domicilio}","boca":"${requestDatosPersona.boca}","nariz":"${requestDatosPersona.nariz}","cabello":"${requestDatosPersona.cabello}","ojos":"${requestDatosPersona.ojos}","piel":"${requestDatosPersona.piel}","ocupacion":"${requestDatosPersona.ocupacion}","estado_civil":"${requestDatosPersona.estado_civil}","foto":"${requestDatosPersona.foto}","firma":"${requestDatosPersona.firma}","pu_i":"${requestDatosPersona.pu_i}","pu_d":"${requestDatosPersona.pu_d}","tipo_sangre":"${requestDatosPersona.tipo_sangre}"}`;

    console.log('esta es el body guardar persona ' + body);
    console.log('esta es la url guardar persona ' + this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }
*/

  createPersona(requestDatosPersona: RequestDatosPersona) {
    //comento url de alex
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona";

    const body = `{"nombre":"${requestDatosPersona.nombre}","ape_materno":"${requestDatosPersona.ape_materno}",
    "ape_paterno":"${requestDatosPersona.ape_paterno}","ape_casada":"${requestDatosPersona.ape_casada}",
    "fecha_emision_dui":"${requestDatosPersona.fecha_emision_dui}","dui":"${requestDatosPersona.dui}",
    "email":"${requestDatosPersona.email}","genero":"${requestDatosPersona.genero}","fecha_vto_dui":"${requestDatosPersona.fecha_vto_dui}",
    "telefono_celular":"${requestDatosPersona.telefono_celular}","ocupacion":"${requestDatosPersona.ocupacion}","estado_civil":"${requestDatosPersona.estado_civil}"}`;

    console.log('esta es el body crear persona tmp ' + body);
    console.log('esta es la url crear persona tmp ' + this.url_tmp_datos_personales_crear);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_personales_crear, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


  updatePersonalInformation(requestDatosPersona: RequestDatosPersona) {
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/personal_information/"+sessionStorage.getItem('dui');

    const body = `{"nombre":"${requestDatosPersona.nombre}","ape_materno":"${requestDatosPersona.ape_materno}",
    "ape_paterno":"${requestDatosPersona.ape_paterno}","ape_casada":"${requestDatosPersona.ape_casada}",
    "fecha_emision_dui":"${requestDatosPersona.fecha_emision_dui}","dui":"${requestDatosPersona.dui}",
    "email":"${requestDatosPersona.email}","genero":"${requestDatosPersona.genero}","fecha_vto_dui":"${requestDatosPersona.fecha_vto_dui}",
    "telefono_celular":"${requestDatosPersona.telefono_celular}","ocupacion":"${requestDatosPersona.ocupacion}","estado_civil":"${requestDatosPersona.estado_civil}"}`;

    console.log('esta es el body actualizar datos personales tmp ' + body);
    console.log('esta es la url actualizar datos personales tmp ' + this.url_tmp_datos_personales_update);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_personales_update, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


  physicInformation(requestDatosPersona: RequestDatosPersona) {

    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/physic_information";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","anteojos":"${requestDatosPersona.anteojos}","nariz":"${requestDatosPersona.nariz}",
    "piel":"${requestDatosPersona.piel}","senales_especiales":"${requestDatosPersona.senales_especiales}",
    "boca":"${requestDatosPersona.boca}","audifonos":"${requestDatosPersona.audifonos}",
    "peso_libras":"${requestDatosPersona.peso_libras}","cabello":"${requestDatosPersona.cabello}","lentes_contacto":"${requestDatosPersona.lentes_contacto}",
    "ojos":"${requestDatosPersona.ojos}","estatura":"${requestDatosPersona.estatura}","tipo_sangre":"${requestDatosPersona.tipo_sangre}"}`;

    console.log('esta es el body actualizar informacion fisica persona ' + body);
    console.log('esta es la url actualizar informacion fisica persona ' + this.url_tmp_datos_fisicos);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_fisicos, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  demographicInformation(requestDatosPersona: RequestDatosPersona) {

    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/demographic_information";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","domicilio":"${requestDatosPersona.domicilio}","lugar_nacimiento":"${requestDatosPersona.lugar_nacimiento}",
    "municipio":"${requestDatosPersona.municipio}","fecha_nacimiento":"${requestDatosPersona.fecha_nacimiento}"}`;

    console.log('esta es el body actualizar informacion demografica persona ' + body);
    console.log('esta es la url actualizar informacion demografica persona ' + this.url_tmp_datos_demograficos);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_demograficos, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  sign(requestDatosPersona: RequestDatosPersona) {
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/sign";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","firma":"${requestDatosPersona.firma}"}`;

   console.log('esta es el body guardar firma tmp ' + body);
    console.log('esta es la url guardar firma tmp ' + this.url_tmp_datos_firma);

    //console.log('esta es la url_tmp_datos_firma validate login '+this.url_tmp_datos_firma);

    return this.http.post<any>(this.url_tmp_datos_firma, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  photography(requestDatosPersona: RequestDatosPersona) {
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/photography";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","foto":"${requestDatosPersona.foto}"}`;

   console.log('esta es el body guardar foto tmp ' + body);
    console.log('esta es la url guardar foto tmp ' + this.url_tmp_datos_foto);

    //console.log('esta es la url_tmp_datos_foto validate login '+this.url_tmp_datos_foto);

    return this.http.post<any>(this.url_tmp_datos_foto, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }




  getPersona() {

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    //this.url ="http://192.168.26.32/blog/public/api/tmp_persona/"+sessionStorage.getItem('dui');
    console.log("dui= "+sessionStorage.getItem('dui'));
    this.url_obtener_tmp_datos_persona =this.url_tmp_datos_persona+sessionStorage.getItem('dui');

    console.log('esta es la url show persona ' + this.url_obtener_tmp_datos_persona);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_obtener_tmp_datos_persona, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



}
