import { Component, OnInit } from '@angular/core';
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

  constructor(private datosPersonaService: DatosPersonaService) { }

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




}
