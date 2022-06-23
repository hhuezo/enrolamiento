import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseEstadosCivil } from '../_model/responseEstadosCivil';
import { ResponseGeneros } from '../_model/responseGeneros';
import { ResponseOcupaciones } from '../_model/responseOcupaciones';
import { CatalogoService } from '../_service/catalogo.service';
import { DatosPersonaService } from '../_service/datos-persona.service';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  //combos
  ocupaciones: any;
  responseOcupaciones?: ResponseOcupaciones;

  RequestDatosPersona?: RequestDatosPersona;


  persona: any;


  form!: FormGroup;
  submitted = false;

  nombre!: string;
  ape_paterno!: string;
  ape_materno!: string;
  ape_casada!: string;
  dui!: string;
  fecha_emision_dui!: string;
  ocupacion!: string;
  fecha_vto_dui!: string;
  email!: string;
  estado_civil!: string;
  genero!: string;
  telefono_celular!: string;

  img_personal_information?: HTMLImageElement;


  responseGeneros?: ResponseGeneros[];
  generos: ResponseGeneros[] = [];

  responseEstadosCivil?: ResponseEstadosCivil[];
  estados_civil: ResponseEstadosCivil[] = [];




  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private catalogoService: CatalogoService,
    private datosPersonaService: DatosPersonaService,
  ) { }


  ngOnInit(): void {



    this.load_icons();
    this.submitted = true;


    //para combo de ocupaciones
    this.catalogoService.getOcupaciones().subscribe((resp: ResponseOcupaciones) => {
      this.responseOcupaciones = resp;
      //console.log('ocupaciones: ', this.responseOcupaciones);
      this.ocupaciones = this.responseOcupaciones;
    });


    //para combo de generos
    this.catalogoService.getGeneros('1').subscribe((resp: ResponseGeneros[]) => {
      this.responseGeneros = resp;
      // console.log('response generos: ', this.responseGeneros);

      this.generos = this.responseGeneros;


    });


    //para combo de estados civiles
    this.catalogoService.getEstadosCiviles().subscribe((resp: ResponseEstadosCivil[]) => {
      this.responseEstadosCivil = resp;
      //console.log('response estados civil: ', this.responseEstadosCivil);

      this.estados_civil = this.responseEstadosCivil;


    });







    if (!sessionStorage.getItem('dui') || sessionStorage.getItem('dui') == null) {
      //console.log('sin session');
    }
    else {
      console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;

        //  console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.RequestDatosPersona;


        this.nombre = this.persona[0].PER_NOMBRE;
        this.ape_paterno = this.persona[0].PER_APELLIDO_PATERNO;
        this.ape_materno = this.persona[0].PER_APELLIDO_MATERNO;
        this.ape_casada = this.persona[0].PER_APELLIDO_CASADA;
        this.dui = this.persona[0].PER_NRO_DE_DOCUMENTO;
        this.fecha_emision_dui = this.persona[0].PER_FECHA_EMISION_DUI
        this.ocupacion = this.persona[0].PER_ID_OCU_CODIGO;
        this.fecha_vto_dui = this.persona[0].PER_FECHA_VENCIMIENTO_DUI

        this.email = this.persona[0].PER_EMAIL;
        this.estado_civil = this.persona[0].PER_ESTADO_CIVIL;
        this.genero = this.persona[0].PER_SEXO;
        this.telefono_celular = this.persona[0].PER_TELEFONO_PERSONAL;



      });


    }










    this.form = this.formBuilder.group(
      {
        txt_nombre: ['', Validators.required],
        txt_ape_paterno: ['', Validators.required],
        txt_ape_materno: ['', Validators.required],
        txt_ape_casada: ['', Validators.required],
        txt_dui: ['', Validators.required],
        txt_fecha_emision_dui: ['', Validators.required],
        cbo_ocupacion: ['', Validators.required],
        txt_fecha_vto_dui: ['', Validators.required],
        txt_email: ['', Validators.required],
        cbo_estado_civil: ['', Validators.required],
        cbo_genero: ['', Validators.required],
        txt_telefono_celular: ['', Validators.required],

      })










  }


  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }


  back() {
    this.router.navigate(['/home']);
  }

  guardar() {


    this.nombre = this.form.controls['txt_nombre'].value;
    this.ape_paterno = this.form.controls['txt_ape_paterno'].value;
    this.ape_materno = this.form.controls['txt_ape_materno'].value;
    this.ape_casada = this.form.controls['txt_ape_casada'].value;
    this.dui = this.form.controls['txt_dui'].value;
    this.fecha_emision_dui = this.form.controls['txt_fecha_emision_dui'].value;
    this.ocupacion = this.form.controls['cbo_ocupacion'].value;
    this.fecha_vto_dui = this.form.controls['txt_fecha_vto_dui'].value;
    this.email = this.form.controls['txt_email'].value;
    this.estado_civil = this.form.controls['cbo_estado_civil'].value;
    this.genero = this.form.controls['cbo_genero'].value;
    this.telefono_celular = this.form.controls['txt_telefono_celular'].value;

    //console.log("aaa: " + this.genero);

   /* console.log('this.nombre= ' + this.nombre + '<br>');
    console.log('this.ape_paterno= ' + this.ape_paterno + '<br>');
    console.log('this.ape_materno= ' + this.ape_materno + '<br>');
    console.log('this.ape_casada= ' + this.ape_casada + '<br>');
    console.log('this.dui= ' + this.dui + '<br>');
    console.log('this.fecha_emision_dui= ' + this.fecha_emision_dui + '<br>');
    console.log('this.ocupacion= ' + this.ocupacion + '<br>');
    console.log('this.fecha_vto_dui= ' + this.fecha_vto_dui + '<br>');
    console.log('this.email= ' + this.email + '<br>');
    console.log('this.estado_civil= ' + this.estado_civil + '<br>');
    console.log('this.genero= ' + this.genero + '<br>');
    console.log('this.telefono_celular= ' + this.telefono_celular + '<br>');

    console.log('guardando datos... de informacion personal');*/

    /* sessionStorage.setItem('nombre', this.nombre);
     sessionStorage.setItem('ape_paterno', this.ape_paterno);
     sessionStorage.setItem('ape_materno', this.ape_materno);
     sessionStorage.setItem('ape_casada', this.ape_casada);

     sessionStorage.setItem('fecha_emision_dui', this.fecha_emision_dui);
     sessionStorage.setItem('ocupacion', this.ocupacion);
     sessionStorage.setItem('fecha_vto_dui', this.fecha_vto_dui);
     sessionStorage.setItem('email', this.email);
     sessionStorage.setItem('estado_civil', this.estado_civil);
     sessionStorage.setItem('genero', this.genero);
     sessionStorage.setItem('telefono_celular', this.telefono_celular);*/





    // guardando persona en tabla temporal
    let body = new RequestDatosPersona();
    body.nombre = this.nombre;
    body.ape_materno = this.ape_materno;
    body.ape_paterno = this.ape_paterno;
    body.ape_casada = this.ape_casada;
    body.fecha_emision_dui = this.fecha_emision_dui;
    body.dui = this.dui;
    body.email = this.email;
    body.genero = this.genero;
    body.fecha_vto_dui = this.fecha_vto_dui;
    body.telefono_celular = this.telefono_celular;
    body.ocupacion = this.ocupacion;
    body.estado_civil = this.estado_civil;

    console.log("bodyyyy " + body);

    if (!sessionStorage.getItem('dui') || sessionStorage.getItem('dui') == null) {
      this.datosPersonaService.createPersona(body).subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;
        sessionStorage.setItem('dui', this.dui);
      });
    }
    else {

      //console.log("bodyyyy " + body);

      //update
      this.datosPersonaService.updatePersonalInformation(body).subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;
        //console.log("aaa resp "+resp);
      });
    }




     this.router.navigate(['/physic-information']);
  }

  load_icons() {
    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";
  }

}
