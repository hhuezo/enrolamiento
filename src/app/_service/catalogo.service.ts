import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  divisionSeleccionada?: string;

  private url_paises: string = `${environment.HOST_LOGIN}/api/catalogo/paises`;
  private url_departamentos: string = `${environment.HOST_LOGIN}/api/catalogo/departamentos`;
  private url_municipios: string = `${environment.HOST_LOGIN}/api/catalogo/municipios`;
  private url_ocupaciones: string = `${environment.HOST_LOGIN}/api/catalogo/ocupaciones`;
  private url_generos: string = `${environment.HOST_LOGIN}/api/catalogo/generos`;
  private url_estados: string = `${environment.HOST_LOGIN}/api/catalogo/estados`;
  //private requestLogin?: RequestLogin;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPaises() {

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    //console.log('esta es la url catalogo paises ' + this.url_paises);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_paises, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getOcupaciones() {

    //this.url_ocupaciones = "http://192.168.26.32/blog/public/api/get_ocupaciones";
    //console.log('esta es la url catalogo ocupaciones ' + this.url_ocupaciones);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_ocupaciones, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getDepartamentos(paisSeleccionado: string) {

    if (paisSeleccionado === '1') this.divisionSeleccionada = 'DP';
    if (paisSeleccionado === '2') this.divisionSeleccionada = 'PV';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    console.log('esta es la url catalogo departamentos ' + this.url_departamentos);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_departamentos + "/" + paisSeleccionado + "/" + this.divisionSeleccionada, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getMunicipios(paisSeleccionado: string, departamentoSeleccionado: string) {

    if (paisSeleccionado === '1') this.divisionSeleccionada = 'MU';
    if (paisSeleccionado === '2') this.divisionSeleccionada = 'DT';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    console.log('esta es la url catalogo departamentos ' + this.url_municipios);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_municipios + "/" + paisSeleccionado + "/" + this.divisionSeleccionada + "/" + departamentoSeleccionado, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }




  getGeneros() {

    this.url_generos = "http://192.168.26.32/blog/public/api/get_generos";


    return this.http.get<any>(this.url_generos, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getEstadoCivil() {

    this.url_estados = "http://192.168.26.32/blog/public/api/get_estado_civil";


    return this.http.get<any>(this.url_estados, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }






}
