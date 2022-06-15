import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestFirma } from '../_model/requestFirma';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  private url: string = `${environment.HOST_LOGIN}/api/firma/guardar`;
  private requestFirma?: RequestFirma;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  guardarFirma(requestFirma: RequestFirma){

    //console.log("Inicio dentro de login");
    
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    const body = `{"idPersona":"${requestFirma.idPersona}","firma":"${requestFirma.firma}"}`;

console.log('esta es el body guardar firma '+body);
console.log('esta es la url guardar firma '+this.url);

    //console.log('esta es la url validate login '+this.url);

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

  }





}
