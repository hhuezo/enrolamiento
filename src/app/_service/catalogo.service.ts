import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private url: string = `${environment.HOST_LOGIN}/api/catalogo/paises`;
  //private requestLogin?: RequestLogin;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPaises(){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

//console.log('esta es el body validate login '+body);
console.log('esta es la url catalogo paises '+this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }





}
