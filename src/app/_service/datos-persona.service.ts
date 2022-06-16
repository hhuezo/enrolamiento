import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestDatosPersona } from '../_model/requestDatosPersona';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonaService {

  private url: string = `${environment.HOST_LOGIN}/api/persona/guardar`;
  private requestDatosPersona?: RequestDatosPersona;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

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


  createPersona(requestDatosPersona: RequestDatosPersona) {
    this.url = "http://192.168.26.32/blog/public/api/tmp_persona/";
    const body = `{"nombre":"${requestDatosPersona.nombre}","ape_materno":"${requestDatosPersona.ape_materno}",
    "ape_paterno":"${requestDatosPersona.ape_paterno}","ape_casada":"${requestDatosPersona.ape_casada}",
    "fecha_emision_dui":"${requestDatosPersona.fecha_emision_dui}","dui":"${requestDatosPersona.dui}",
    "email":"${requestDatosPersona.email}","genero":"${requestDatosPersona.genero}","fecha_vto_dui":"${requestDatosPersona.fecha_vto_dui}",
    "telefono_celular":"${requestDatosPersona.telefono_celular}"}`;

    console.log('esta es el body guardar persona ' + body);
    console.log('esta es la url guardar persona ' + this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
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
