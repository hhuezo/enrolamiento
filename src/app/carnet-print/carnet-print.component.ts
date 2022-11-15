import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
@Component({
  selector: 'app-carnet-print',
  templateUrl: './carnet-print.component.html',
  styleUrls: ['./carnet-print.component.css']
})
export class CarnetPrintComponent implements OnInit {

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];
  persona: any;
  foto?: string;
  firma?: string;
  dui?: string;
  nombre?: string;
  ape_paterno?: string;
  ape_materno?: string;
  fecha_nacimiento?: string;
  lugar_nacimiento?: string;
  nacionalidad?: string;
  genero?: string;
  tipo_sangre?: string;
  expedida?: string;
  sign?: string;

  genero_full?: string;

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;
  img_sign?: HTMLImageElement;

  constructor(private datosPersonaService: DatosPersonaService, private router: Router) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona actual: ', this.responseTmpDatosPersona);
        this.persona = this.responseTmpDatosPersona;

        this.nombre = this.persona[0].nombre;
        this.ape_paterno = this.persona[0].ape_paterno;
        this.ape_materno = this.persona[0].ape_materno;
        this.dui = this.persona[0].dui;
        this.foto = this.persona[0].foto;
        this.sign = this.persona[0].firma;
        this.fecha_nacimiento = this.persona[0].fecha_nacimiento_dmy;
        this.nacionalidad = this.persona[0].pais_descripcion;
        this.genero = this.persona[0].genero_descripcion;
        this.tipo_sangre = this.persona[0].tipo_sangre;
        this.expedida = this.persona[0].fecha_emision_dui_dmy;

      });


    }

    /*  this.foto = sessionStorage.getItem('foto')!;
      this.firma = sessionStorage.getItem('firma')!;

      this.dui = sessionStorage.getItem('dui')!;
      this.nombre = sessionStorage.getItem('nombre')?.toUpperCase()!;
      this.ape_paterno = sessionStorage.getItem('ape_paterno')?.toUpperCase()!;
      this.ape_materno = sessionStorage.getItem('ape_materno')?.toUpperCase()!;
      this.fecha_nacimiento = sessionStorage.getItem('fecha_nacimiento')!;
      this.lugar_nacimiento = sessionStorage.getItem('lugar_nacimiento')!;
      this.nacionalidad = sessionStorage.getItem('pais_nacimiento')!;

      this.genero = sessionStorage.getItem('genero')!;

      if (this.genero == 'MA') {
        this.genero_full = 'MASCULINO';
      }else{
        this.genero_full = 'FEMENINO';
      }

      this.tipo_sangre = sessionStorage.getItem('tipo_sangre')!;
      this.expedida = sessionStorage.getItem('fecha_emision_dui')!;

  */


  }



  
datos_personales() {
  this.router.navigate(['/personal-information']);
}

datos_fisicos() {
  console.log(sessionStorage.getItem('nombre'));
  if (sessionStorage.getItem('nombre') && sessionStorage.getItem('nombre') != '' && sessionStorage.getItem('nombre') != 'null') {

    this.router.navigate(['/physic-information']);
  }

}

datos_demograficos() {
  if (sessionStorage.getItem('anteojos') && sessionStorage.getItem('anteojos') != '' && sessionStorage.getItem('anteojos') != 'null') {
    //console.log("ante :" + sessionStorage.getItem('anteojos'));
    this.router.navigate(['/demographic-information']);
  }
}

fotografia() {
  if (sessionStorage.getItem('domicilio') && sessionStorage.getItem('domicilio') != '' && sessionStorage.getItem('domicilio') != 'null') {

    this.router.navigate(['/photography']);
  }
}

firma_p() {
  if (sessionStorage.getItem('foto') && sessionStorage.getItem('foto') != '' && sessionStorage.getItem('foto') != 'null') {
    this.router.navigate(['/sign']);
  }
}

huella() {
  if (sessionStorage.getItem('firma') && sessionStorage.getItem('firma') != '' && sessionStorage.getItem('firma') != 'null') {
    this.router.navigate(['/fingerprint']);
  }
}








}
