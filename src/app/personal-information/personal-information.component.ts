import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseEstadosCivil } from '../_model/responseEstadosCivil';
import { ResponseGeneros } from '../_model/responseGeneros';
import { ResponseOcupaciones } from '../_model/responseOcupaciones';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { CatalogoService } from '../_service/catalogo.service';
import { DatosPersonaService } from '../_service/datos-persona.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  //combos
  ocupaciones: any;
  responseOcupaciones?: ResponseOcupaciones;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

  persona?: any;


  form!: UntypedFormGroup;
  submitted = false;

  nombre!: string;
  ape_paterno!: string;
  ape_materno!: string;
  ape_casada!: string;
  dui!: string;
  fecha_emision_dui!: string;
  ocupacion!: any;
  fecha_vto_dui!: string;
  email!: string;
  estado_civil!: string;
  genero!: string;
  telefono_celular!: string;
  estado!: any;

  img_personal_information?: HTMLImageElement;


  responseGeneros?: ResponseGeneros[];
  generos: ResponseGeneros[] = [];

  responseEstadosCivil?: ResponseEstadosCivil[];
  estados_civil: ResponseEstadosCivil[] = [];




  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router, private catalogoService: CatalogoService,
    private datosPersonaService: DatosPersonaService,
  ) { }



  ngOnInit(): void {

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

      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona actual: ', this.responseTmpDatosPersona);
        this.persona = this.responseTmpDatosPersona;


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
        this.telefono_celular = this.persona[0].telefono_celular!;

        //variables de session
        sessionStorage.setItem('dui', '');
        sessionStorage.setItem('nombre', '');
        sessionStorage.setItem('anteojos', '');
        sessionStorage.setItem('domicilio', '');
        sessionStorage.setItem('foto', '');
        sessionStorage.setItem('firma', '');

        if (this.persona) {
          //variables de session
          sessionStorage.setItem('dui', this.persona[0].dui);
          sessionStorage.setItem('nombre', this.persona[0].nombre);
          sessionStorage.setItem('anteojos', this.persona[0].anteojos);
          sessionStorage.setItem('domicilio', this.persona[0].domicilio);
          sessionStorage.setItem('foto', this.persona[0].foto);
          sessionStorage.setItem('firma', this.persona[0].firma);
        }



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





    $(document).ready(function () {



      $('#txt_nombre').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_ape_paterno').focus();
        }
      });

      $('#txt_ape_paterno').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_ape_materno').focus();
        }
      });

      $('#txt_ape_materno').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_ape_casada').focus();
        }
      });

      $('#txt_ape_casada').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_dui').focus();
        }
      });

      $('#txt_dui').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_fecha_emision_dui').focus();
        }
      });

      $('#txt_fecha_emision_dui').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#cbo_ocupacion').focus();
        }
      });

      // $('#cbo_ocupacion').keyup(function (e) {
      //   if (e.keyCode === 13) {
      //       alert('doy enter en select');
      //      $('#txt_fecha_vto_dui').focus();
      //   }
      // });


      $('#cbo_ocupacion').change(function (e) {
        $('#txt_fecha_vto_dui').focus();

      });

      $('#txt_fecha_vto_dui').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#txt_email').focus();
        }
      });

      $('#txt_email').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#cbo_estado_civil').focus();
        }
      });

      $('#cbo_estado_civil').change(function (e) {
        $('#cbo_genero').focus();
      });

      $('#cbo_genero').change(function (e) {
        $('#txt_telefono_celular').focus();
      });


      $('#txt_telefono_celular').keyup(function (e) {
        if (e.keyCode === 13) {
          $('#btn_guardar').focus();
        }
      });



    });




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

  firma() {
    if (sessionStorage.getItem('foto') && sessionStorage.getItem('foto') != '' && sessionStorage.getItem('foto') != 'null') {
      this.router.navigate(['/sign']);
    }
  }

  huella() {
    if (sessionStorage.getItem('firma') && sessionStorage.getItem('firma') != '' && sessionStorage.getItem('firma') != 'null') {
      this.router.navigate(['/fingerprint']);
    }
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

    //console.log("bodyyyy " + body);

    if (!sessionStorage.getItem('dui') || sessionStorage.getItem('dui') == null) {
      this.datosPersonaService.createPersona(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.persona = resp;
        sessionStorage.setItem('dui', this.dui);
        sessionStorage.setItem('nombre', this.nombre);
      });
    }
    else {

      //console.log("bodyyyy " + body);

      //update
      this.datosPersonaService.updatePersonalInformation(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.persona = resp;
        //console.log("aaa resp "+resp);
      });
    }




    this.router.navigate(['/physic-information']);
  }



}
