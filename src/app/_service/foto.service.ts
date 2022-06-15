import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestFoto } from '../_model/requestFoto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private url: string = `${environment.HOST_LOGIN}/api/foto/guardar`;
  private requestFoto?: RequestFoto;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  guardarFoto(requestFoto: RequestFoto){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"idPersona":"${requestFoto.idPersona}","foto":"${requestFoto.foto}"}`;

console.log('esta es el body guardar foto '+body);
console.log('esta es la url guardar foto '+this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }





}
