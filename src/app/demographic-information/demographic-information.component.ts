import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseDepartamentos } from '../_model/responseDepartamentos';
import { ResponseMunicipios } from '../_model/responseMunicipios';
import { ResponsePaises } from '../_model/responsePaises';
import { CatalogoService } from '../_service/catalogo.service';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import * as $ from 'jquery';


@Component({
  selector: 'app-demographic-information',
  templateUrl: './demographic-information.component.html',
  styleUrls: ['./demographic-information.component.css']
})
export class DemographicInformationComponent implements OnInit {

  //options icons
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;



  form!: UntypedFormGroup;
  submitted = false;

  dui!: string;
  persona: any;
  domicilio!: string;
  pais_nacimiento!: any;
  lugar_nacimiento!: string;
  municipio!: any;
  departamento!: any;
  fecha_nacimiento!: string;

  responsePaises?: ResponsePaises[];
  paises: ResponsePaises[] = [];



  responseDepartamentos?: ResponseDepartamentos[];
  departamentos: any;

  responseMunicipios?: ResponseMunicipios[];
  municipios: any;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private catalogoService: CatalogoService,
    private datosPersonaService: DatosPersonaService,
  ) { }


  ngOnInit(): void {


    $(document).ready(function(){
      //alert('funcion jquery');

      $('#txt_domicilio').keyup(function (e) {
        if (e.keyCode === 13) {
           $('#cbo_pais_nacimiento').focus();
        }
      });

      $('#cbo_pais_nacimiento').change(function (e) {

           $('#txt_lugar_nacimiento').focus();

      });

      $('#txt_lugar_nacimiento').keyup(function (e) {
        if (e.keyCode === 13) {
           $('#cbo_departamento').focus();
        }
      });

      $('#cbo_departamento').keyup(function (e) {

           $('#txt_fecha_nacimiento').focus();

      });

      $('#txt_fecha_nacimiento').keyup(function (e) {
        if (e.keyCode === 13) {
           $('#cbo_municipio').focus();
        }
      });

      $('#cbo_municipio').change(function (e) {

           $('#btn_guardar').focus();

      });



    });





    this.submitted = true;



    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona actual: ', this.responseTmpDatosPersona);
        this.persona = this.responseTmpDatosPersona;


        this.domicilio = this.persona[0].domicilio;
        this.pais_nacimiento = this.persona[0].pais_nacimiento;
        this.lugar_nacimiento = this.persona[0].lugar_nacimiento;
        this.municipio = this.persona[0].municipio;
        this.dui = this.persona[0].dui;
        this.departamento = this.persona[0].departamento;
        this.fecha_nacimiento = this.persona[0].fecha_nacimiento;


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


        if(this.persona[0].municipio != null)
        {
          this.catalogoService.getMunicipiosActuales(this.persona[0].municipio).subscribe((resp: ResponseMunicipios[]) => {
            this.responseMunicipios = resp;
            this.municipios = this.responseMunicipios;
          });


          this.catalogoService.getDepartamentosActuales(this.persona[0].municipio).subscribe((resp: ResponseDepartamentos[]) => {
            this.responseDepartamentos = resp;
            this.departamentos = this.responseDepartamentos;
          });
        }

      });


    }


    // if (this.form!.invalid) {
    //   return;
    // }

    // sessionStorage.clear();
    // localStorage.clear();

    this.form = this.formBuilder.group(
      {
        txt_domicilio: ['', Validators.required],
        cbo_pais_nacimiento: ['', Validators.required],
        txt_lugar_nacimiento: ['', Validators.required],
        cbo_municipio: ['', Validators.required],
        cbo_departamento: ['', Validators.required],
        txt_fecha_nacimiento: ['', Validators.required],
      }

    );

    /* if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
       this.catalogoService.getMunicipiosActuales().subscribe((resp: ResponsePaises[]) => { this.responsePaises = resp;
         this.paises = this.responsePaises;
       });
     }*/

    this.catalogoService.getPaises().subscribe((resp: ResponsePaises[]) => {
      this.responsePaises = resp;
      this.paises = this.responsePaises;
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


  onChangePais(/*paisSeleccionado: string*/ event:any) {
    //console.log('event :' + event);
    //console.log(event.value);
    this.catalogoService.getDepartamentos(event.value).subscribe((resp: ResponseDepartamentos[]) => {
      this.responseDepartamentos = resp;
      this.departamentos = this.responseDepartamentos;
      }
    );

      //console.log("con: "+JSON.stringify(this.departamentos));
      //console.log("sin: "+this.departamentos);



  }

  /*onChangePais(paisSeleccionado: string) {
    this.catalogoService.getDepartamentos(paisSeleccionado).subscribe((resp: ResponseDepartamentos[]) => {
      this.responseDepartamentos = resp;
      this.departamentos = this.responseDepartamentos;
    });


  }
*/



onChangeDepartamento(departamentoSeleccionado: string) {
  this.catalogoService.getMunicipios(departamentoSeleccionado).subscribe((resp: ResponseMunicipios[]) => {
    this.responseMunicipios = resp;
    this.municipios = this.responseMunicipios;
  });
}

 /* onChangeDepartamento(paisSeleccionado: string, departamentoSeleccionado: string) {
    this.catalogoService.getMunicipios(paisSeleccionado, departamentoSeleccionado).subscribe((resp: ResponseMunicipios[]) => {
      this.responseMunicipios = resp;
      this.municipios = this.responseMunicipios;
    });
  }*/




  back() {
    this.router.navigate(['/home']);
  }

  guardar() {
    this.domicilio = this.form.controls['txt_domicilio'].value;
    this.lugar_nacimiento = this.form.controls['txt_lugar_nacimiento'].value;
    this.departamento = this.form.controls['cbo_departamento'].value;
    this.pais_nacimiento = this.form.controls['cbo_pais_nacimiento'].value;
    this.municipio = this.form.controls['cbo_municipio'].value;
    this.fecha_nacimiento = this.form.controls['txt_fecha_nacimiento'].value;

    console.log('Domicilio : ' + this.domicilio);
    console.log('Lugar de Nacimiento :' + this.lugar_nacimiento);
    console.log('Departamento: ' + this.departamento);
    console.log('Pais de Nacimiento: ' + this.pais_nacimiento);
    console.log('Municipio: ' + this.municipio);
    console.log('Fecha Nacimiento: ' + this.fecha_nacimiento);


    // guardando persona en tabla temporal
    let body = new RequestDatosPersona();
    body.domicilio = this.domicilio;
    body.lugar_nacimiento = this.lugar_nacimiento;
    body.municipio = this.municipio;
    body.fecha_nacimiento = this.fecha_nacimiento;

    if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
      console.log("body" + body);

      //insertado datos
      this.datosPersonaService.demographicInformation(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
      });
    }

     this.router.navigate(['/photography']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }



}
