import { Component, OnInit } from '@angular/core';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
@Component({
  selector: 'app-carnet-print',
  templateUrl: './carnet-print.component.html',
  styleUrls: ['./carnet-print.component.css']
})
export class CarnetPrintComponent implements OnInit {

  RequestDatosPersona?: RequestDatosPersona;
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
    this.load_icons();
    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;

        console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.RequestDatosPersona;

        this.nombre = this.persona[0].PER_NOMBRE;
        this.ape_paterno = this.persona[0].PER_APELLIDO_PATERNO;
        this.ape_materno = this.persona[0].PER_APELLIDO_MATERNO;
        this.dui = this.persona[0].PER_NRO_DE_DOCUMENTO;
        this.foto = this.persona[0].PER_FOTO;
        this.sign = this.persona[0].PER_FIRMA;
        this.fecha_nacimiento = this.persona[0].PER_FECHA_DE_NACIMIENTO_DMY;
        this.nacionalidad = this.persona[0].PAIS;
        this.genero = this.persona[0].GENERO;
        this.tipo_sangre = this.persona[0].PER_GRUPO_SANGUINEO;
        this.expedida = this.persona[0].PER_FECHA_EMISION_DUI_DMY;

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

  load_icons() {

    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";

    this.img_physic_information = document.getElementById("img_physic_information") as HTMLImageElement;
    this.img_physic_information.src = "../../assets/images/datos_fisicos_blue.svg";

    this.img_demographic_information = document.getElementById("img_demographic_information") as HTMLImageElement;
    this.img_demographic_information.src = "../../assets/images/datos_demograficos_blue.svg";

    this.img_photography = document.getElementById("img_photography") as HTMLImageElement;
    this.img_photography.src = "../../assets/images/datos_foto_blue.svg";

    this.img_sign = document.getElementById("img_sign") as HTMLImageElement;
    this.img_sign.src = "../../assets/images/firma_blue.svg";

  }


}
