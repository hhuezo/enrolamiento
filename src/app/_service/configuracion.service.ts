import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestConfiguracion } from '../_model/requestConfiguracion';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private url: string = `${environment.HOST_LOGIN}/api/firma/guardar`;
  private requestConfiguracion?: RequestConfiguracion;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  guardarConfiguracion(requestConfiguracion: RequestConfiguracion){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"id_tdo_codigo":"${requestConfiguracion.id_tdo_codigo}","tipo_documento":"${requestConfiguracion.tipo_documento}"},"id_codigo_pais":"${requestConfiguracion.id_codigo_pais}"},"nombre_pais":"${requestConfiguracion.nombre_pais}"},"codigo_area_pais":"${requestConfiguracion.codigo_area_pais}"}`;

console.log('esta es el body guardar configuracion '+body);
console.log('esta es la url guardar configuracion '+this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }





}