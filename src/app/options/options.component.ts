import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private router: Router, private datosPersonaService: DatosPersonaService) {
  }

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

  persona?: any;
  anteojos: any;
  domicilio: any;
  nombre: any;
  foto: any;
  firma_persona: any;

  ngOnInit(): void {
    if (!sessionStorage.getItem('dui') || sessionStorage.getItem('dui') == null) {
      console.log('sin session');
    }
    else {
      console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona actual: ', this.responseTmpDatosPersona);

        this.nombre = this.persona[0].nombre!;
        this.anteojos = this.persona[0].anteojos;
        this.domicilio = this.persona[0].domicilio;
        this.foto = this.persona[0].foto;
        this.firma_persona = this.persona[0].firma;

        /*this.persona = this.responseTmpDatosPersona;


        this.nombre = this.persona[0].nombre!;
        this.ape_paterno = this.persona[0].ape_paterno!;
        this.ape_materno = this.persona[0].ape_materno!;
        this.ape_casada = this.persona[0].ape_casada!;
        this.dui = this.persona[0].dui!;
        this.fecha_emision_dui = this.persona[0].fecha_emision_dui!;
        this.ocupacion = +this.persona[0].ocupacion!;
        this.fecha_vto_dui = this.persona[0].fecha_vto_dui!;

        this.email = this.persona[0].email!;
        this.estado_civil = this.persona[0].estado_civil!;
        this.genero = this.persona[0].genero!;
        this.telefono_celular = this.persona[0].telefono_celular!;*/



      });

      // console.log('this.nombre: ', this.nombre);


    }
  }

  datos_personales() {
    this.router.navigate(['/personal-information']);
  }

  datos_fisicos() {
    if ( this.nombre != null) {
      this.router.navigate(['/physic-information']);
    }
  }

  datos_demograficos() {
    //domicilio
    if ( this.anteojos != null) {
    this.router.navigate(['/demographic-information']);
    }
  }

  fotografia() {
    if ( this.domicilio != null) {
    this.router.navigate(['/photography']);
    }
  }

  firma() {
    if ( this.foto != null) {
    this.router.navigate(['/sign']);
    }
  }

  huella() {
    if ( this.firma_persona != null) {
    this.router.navigate(['/fingerprint']);
    }
  }

}
