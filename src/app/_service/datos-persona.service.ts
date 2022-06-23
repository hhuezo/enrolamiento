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

  private url: string = `${environment.HOST_LOGIN}/api/persona/guardar`;
  private url_tmp_datos_personales: string = `${environment.HOST_LOGIN}/api/tmp_datos_personales/guardar`;
  private url_tmp_datos_fisicos: string = `${environment.HOST_LOGIN}/api/tmp_datos_fisicos/guardar`;
  private url_tmp_datos_demograficos: string = `${environment.HOST_LOGIN}/api/tmp_datos_demograficos/guardar`;

  private responseTmpDatosPersona?: ResponseTmpDatosPersona;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  guardarPersona(responseTmpDatosPersona: ResponseTmpDatosPersona) {

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"nombre":"${responseTmpDatosPersona.nombre}","ape_materno":"${responseTmpDatosPersona.ape_materno}","ape_paterno":"${responseTmpDatosPersona.ape_paterno}","ape_casada":"${responseTmpDatosPersona.ape_casada}","fecha_emision_dui":"${responseTmpDatosPersona.fecha_emision_dui}","dui":"${responseTmpDatosPersona.dui}","email":"${responseTmpDatosPersona.email}","genero":"${responseTmpDatosPersona.genero}","fecha_vto_dui":"${responseTmpDatosPersona.fecha_vto_dui}","telefono_celular":"${responseTmpDatosPersona.telefono_celular}","anteojos":"${responseTmpDatosPersona.anteojos}","audifonos":"${responseTmpDatosPersona.audifonos}","senales_especiales":"${responseTmpDatosPersona.senales_especiales}","peso_libras":"${responseTmpDatosPersona.peso_libras}","lentes_contacto":"${responseTmpDatosPersona.lentes_contacto}","estatura":"${responseTmpDatosPersona.estatura}","fecha_nacimiento":"${responseTmpDatosPersona.fecha_nacimiento}","lugar_nacimiento":"${responseTmpDatosPersona.lugar_nacimiento}","municipio":"${responseTmpDatosPersona.municipio}","pais_nacimiento":"${responseTmpDatosPersona.pais_nacimiento}","domicilio":"${responseTmpDatosPersona.domicilio}","boca":"${responseTmpDatosPersona.boca}","nariz":"${responseTmpDatosPersona.nariz}","cabello":"${responseTmpDatosPersona.cabello}","ojos":"${responseTmpDatosPersona.ojos}","piel":"${responseTmpDatosPersona.piel}","ocupacion":"${responseTmpDatosPersona.ocupacion}","estado_civil":"${responseTmpDatosPersona.estado_civil}","foto":"${responseTmpDatosPersona.foto}","firma":"${responseTmpDatosPersona.firma}","pu_i":"${responseTmpDatosPersona.pu_i}","pu_d":"${responseTmpDatosPersona.pu_d}","tipo_sangre":"${responseTmpDatosPersona.tipo_sangre}"}`;

    console.log('esta es el body guardar persona ' + body);
    console.log('esta es la url guardar persona ' + this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  createPersona(responseTmpDatosPersona: ResponseTmpDatosPersona) {
    //comento url de alex
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona";
    
    const body = `{"nombre":"${responseTmpDatosPersona.nombre}","ape_materno":"${responseTmpDatosPersona.ape_materno}",
    "ape_paterno":"${responseTmpDatosPersona.ape_paterno}","ape_casada":"${responseTmpDatosPersona.ape_casada}",
    "fecha_emision_dui":"${responseTmpDatosPersona.fecha_emision_dui}","dui":"${responseTmpDatosPersona.dui}",
    "email":"${responseTmpDatosPersona.email}","genero":"${responseTmpDatosPersona.genero}","fecha_vto_dui":"${responseTmpDatosPersona.fecha_vto_dui}",
    "telefono_celular":"${responseTmpDatosPersona.telefono_celular}","ocupacion":"${responseTmpDatosPersona.ocupacion}","estado_civil":"${responseTmpDatosPersona.estado_civil}"}`;

    console.log('esta es el body guardar persona tmp ' + body);
    console.log('esta es la url guardar persona tmp ' + this.url_tmp_datos_personales);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_personales, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updatePersonalInformation(responseTmpDatosPersona: ResponseTmpDatosPersona) {
    //this.url = "http://192.168.26.32/blog/public/api/tmp_persona/personal_information/"+sessionStorage.getItem('dui');

    const body = `{"nombre":"${responseTmpDatosPersona.nombre}","ape_materno":"${responseTmpDatosPersona.ape_materno}",
    "ape_paterno":"${responseTmpDatosPersona.ape_paterno}","ape_casada":"${responseTmpDatosPersona.ape_casada}",
    "fecha_emision_dui":"${responseTmpDatosPersona.fecha_emision_dui}","dui":"${responseTmpDatosPersona.dui}",
    "email":"${responseTmpDatosPersona.email}","genero":"${responseTmpDatosPersona.genero}","fecha_vto_dui":"${responseTmpDatosPersona.fecha_vto_dui}",
    "telefono_celular":"${responseTmpDatosPersona.telefono_celular}","ocupacion":"${responseTmpDatosPersona.ocupacion}"}`;

    console.log('esta es el body modifica persona ' + body);
    console.log('esta es la url guardar persona ' + this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


  physicInformation(responseTmpDatosPersona: ResponseTmpDatosPersona) {

    this.url = "http://192.168.26.32/blog/public/api/tmp_persona/physic_information";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","anteojos":"${responseTmpDatosPersona.anteojos}","nariz":"${responseTmpDatosPersona.nariz}",
    "piel":"${responseTmpDatosPersona.piel}","senales_especiales":"${responseTmpDatosPersona.senales_especiales}",
    "boca":"${responseTmpDatosPersona.boca}","audifonos":"${responseTmpDatosPersona.audifonos}",
    "peso_libras":"${responseTmpDatosPersona.peso_libras}","cabello":"${responseTmpDatosPersona.cabello}","lentes_contacto":"${responseTmpDatosPersona.lentes_contacto}",
    "ojos":"${responseTmpDatosPersona.ojos}","estatura":"${responseTmpDatosPersona.estatura}","tipo_sangre":"${responseTmpDatosPersona.tipo_sangre}"}`;

    console.log('esta es el body guardar persona ' + body);
    console.log('esta es la url guardar persona ' + this.url_tmp_datos_fisicos);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_fisicos, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  demographicInformation(responseTmpDatosPersona: ResponseTmpDatosPersona) {

    this.url = "http://192.168.26.32/blog/public/api/tmp_persona/demographic_information";
    const body = `{"dui":"${sessionStorage.getItem("dui")}","domicilio":"${responseTmpDatosPersona.domicilio}","lugar_nacimiento":"${responseTmpDatosPersona.lugar_nacimiento}",
    "municipio":"${responseTmpDatosPersona.municipio}","fecha_nacimiento":"${responseTmpDatosPersona.fecha_nacimiento}"}`;

    console.log('esta es el body guardar persona ' + body);
    console.log('esta es la url guardar persona ' + this.url_tmp_datos_demograficos);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url_tmp_datos_demograficos, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }




  getPersona() {

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    this.url ="http://192.168.26.32/blog/public/api/tmp_persona/"+sessionStorage.getItem('dui');
    console.log('esta es la url show persona ' + this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



}
