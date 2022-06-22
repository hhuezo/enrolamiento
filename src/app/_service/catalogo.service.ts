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
  private url_estados_civiles: string = `${environment.HOST_LOGIN}/api/catalogo/estados_civil`;
  private url_tipos_documento: string = `${environment.HOST_LOGIN}/api/catalogo/tipos_documento`;

  private url_tipos_nariz: string = `${environment.HOST_LOGIN}/api/catalogo/tipos_nariz`;
  private url_colores_piel: string = `${environment.HOST_LOGIN}/api/catalogo/colores_piel`;
  private url_tipos_boca: string = `${environment.HOST_LOGIN}/api/catalogo/tipos_boca`;
  private url_colores_cabello: string = `${environment.HOST_LOGIN}/api/catalogo/colores_cabello`;
  private url_colores_ojo: string = `${environment.HOST_LOGIN}/api/catalogo/colores_ojo`;


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


  getPais(paisSeleccionado: string){

    // if (paisSeleccionado==='1') this.divisionSeleccionada='DP';
    // if (paisSeleccionado==='2') this.divisionSeleccionada='PV';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

//console.log('esta es el body validate login '+body);
console.log('esta es la url catalogo de pais seleccionado '+this.url_paises);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_paises+"/"+paisSeleccionado, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getTipoDocumento(codigoTipoDocumento: string){

    // if (paisSeleccionado==='1') this.divisionSeleccionada='DP';
    // if (paisSeleccionado==='2') this.divisionSeleccionada='PV';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

//console.log('esta es el body validate login '+body);
console.log('esta es la url catalogo de tipo documento seleccionado '+this.url_tipos_documento);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_tipos_documento+"/"+codigoTipoDocumento, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getOcupaciones() {

    //this.url_ocupaciones ="http://192.168.26.32/blog/public/api/get_ocupaciones";
    //console.log('esta es la url catalogo paises ' + this.url_ocupaciones);

    //console.log('esta es la url validate login '+this.url);

    return this.http.get<any>(this.url_ocupaciones, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getDepartamentos(paisSeleccionado: string) {

    if (paisSeleccionado === '72') this.divisionSeleccionada = 'DP';
    if (paisSeleccionado === '139') this.divisionSeleccionada = 'PV';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
    //console.log('esta es la url catalogo departamentos ' + this.url_departamentos);

    console.log('esta es la url de departamentos '+this.url_departamentos + "/" + paisSeleccionado + "/" + this.divisionSeleccionada);

    return this.http.get<any>(this.url_departamentos + "/" + paisSeleccionado + "/" + this.divisionSeleccionada, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getMunicipios(paisSeleccionado: string, departamentoSeleccionado: string) {

    this.url_municipios = `${environment.HOST_LOGIN}/api/catalogo/municipios`;
    console.log("urlll: "+this.url_municipios + "/" + paisSeleccionado + "/" + departamentoSeleccionado);

    if (paisSeleccionado === '72') this.divisionSeleccionada = 'MU';
    if (paisSeleccionado === '139') this.divisionSeleccionada = 'DT';

    //console.log("Inicio dentro de login");

    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    //const body = `{"username":"${requestLogin.user_name}","password":"${requestLogin.password}"}`;

    //console.log('esta es el body validate login '+body);
  //  console.log('esta es la url catalogo departamentos ' + this.url_municipios);



    return this.http.get<any>(this.url_municipios + "/" + paisSeleccionado + "/" + this.divisionSeleccionada + "/" + departamentoSeleccionado, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getMunicipiosActuales(ubicacion: string)
  {
    console.log('ubicacion: '+ "http://192.168.26.32/blog/public/api/get_municipios/"+ubicacion);
    this.url_municipios = "http://192.168.26.32/blog/public/api/get_municipios";

    return this.http.get<any>(this.url_municipios+"/"+ubicacion, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getDepartamentosActuales(ubicacion: string)
  {
    console.log('ubicacion: '+ "http://192.168.26.32/blog/public/api/get_departamentos/"+ubicacion);
    this.url_departamentos= "http://192.168.26.32/blog/public/api/get_departamentos";

    return this.http.get<any>(this.url_departamentos+"/"+ubicacion, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }








  getGeneros(paisSeleccionado: string){
    return this.http.get<any>(this.url_generos+"/"+paisSeleccionado, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getEstadosCiviles(){
    return this.http.get<any>(this.url_estados_civiles, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getTiposDocumento(){
    return this.http.get<any>(this.url_tipos_documento, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getTiposNariz(){
    return this.http.get<any>(this.url_tipos_nariz, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getColoresPiel(){
    return this.http.get<any>(this.url_colores_piel, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }



  getTiposBoca(){
    return this.http.get<any>(this.url_tipos_boca, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getColoresCabello(){
    return this.http.get<any>(this.url_colores_cabello, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


  getColoresOjo(){
    return this.http.get<any>(this.url_colores_ojo, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }


}
