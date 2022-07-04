import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private router: Router, private datosPersonaService: DatosPersonaService) {
  }

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

  persona_option?: any;
  anteojos_option: any;
  domicilio_option: any;
  nombre_option: any;
  foto_option: any;
  firma_persona_option: any;
  //estado: any;

  img_personal_information?: HTMLImageElement;

  ngOnInit(): void {
    /*this.estado = 0;



    if (!sessionStorage.getItem('dui') || sessionStorage.getItem('dui') == null) {

    }
    else {

      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
        this.persona_option = this.responseTmpDatosPersona;

        //console.log('sin session '+ resp);

        this.nombre_option = this.persona_option[0].nombre;
        //console.log('persona actualll: ', this.nombre_option);
        //this.anteojos = this.persona[0].anteojos;
        this.domicilio_option = this.persona_option[0].domicilio;
        this.foto_option = this.persona_option[0].foto;
        this.firma_persona_option = this.persona_option[0].firma;



        if (this.firma_persona_option != null) {
          this.estado = 5;
        }
        else if (this.foto_option != null) {
          this.estado = 4;
        }
        else if (this.domicilio_option != null) {
          this.estado = 3;
        }
        else if (this.anteojos_option != null) {
          this.estado = 2;
        }
        else if (this.nombre_option != null) {

          this.estado = 1;
        }

        console.log("estado: "+this.estado);


                   $(document).ready(function () {
                     load_iconos();

                     function load_iconos() {


                       if($("#estado").val() == 1)
                       {
                         $("#img_personal_information").attr("src", "../../assets/images/datos_personales_blue.svg");
                       }
                       else if($("#estado").val() == 2)
                       {
                         $("#img_personal_information").attr("src", "../../assets/images/datos_personales_blue.svg");
                         $("#img_physic_information").attr("src",  "../../assets/images/datos_fisicos_blue.svg");
                       }
                       else if($("#estado").val() == 3)
                       {
                         $("#img_personal_information").attr("src", "../../assets/images/datos_personales_blue.svg");
                           $("#img_physic_information").attr("src",  "../../assets/images/datos_fisicos_blue.svg");
                           $("#img_demographic_information").attr("src", "../../assets/images/datos_demograficos_blue.svg");
                       }
                       else if($("#estado").val() == 4)
                       {
                         $("#img_personal_information").attr("src", "../../assets/images/datos_personales_blue.svg");
                           $("#img_physic_information").attr("src",  "../../assets/images/datos_fisicos_blue.svg");
                           $("#img_demographic_information").attr("src", "../../assets/images/datos_demograficos_blue.svg");
                           $("#img_photography").attr("src", "../../assets/images/datos_foto_blue.svg");
                       }
                       else if($("#estado").val() == 5)
                       {
                         $("#img_personal_information").attr("src", "../../assets/images/datos_personales_blue.svg");
                         $("#img_physic_information").attr("src",  "../../assets/images/datos_fisicos_blue.svg");
                         $("#img_demographic_information").attr("src", "../../assets/images/datos_demograficos_blue.svg");
                         $("#img_photography").attr("src", "../../assets/images/datos_foto_blue.svg");
                         $("#img_sign").attr("src", "../../assets/images/firma_blue.svg");
                       }
                     }




                   });


      });



      // console.log('this.nombre: ', this.nombre);


    }*/


  }


  datos_personales() {
    this.router.navigate(['/personal-information']);
  }

  datos_fisicos() {
    this.router.navigate(['/physic-information']);
    if (this.nombre_option != null) {
      this.router.navigate(['/physic-information']);
    }
  }

  datos_demograficos() {
    this.router.navigate(['/demographic-information']);
    if (this.anteojos_option != null) {
      this.router.navigate(['/demographic-information']);
    }
  }

  fotografia() {
    this.router.navigate(['/photography']);
    if (this.domicilio_option != null) {
      this.router.navigate(['/photography']);
    }
  }

  firma() {
    this.router.navigate(['/sign']);
    if (this.foto_option != null) {
      this.router.navigate(['/sign']);
    }
  }

  huella() {
    this.router.navigate(['/fingerprint']);
    if (this.firma_persona_option != null) {
      this.router.navigate(['/fingerprint']);
    }
  }

}
