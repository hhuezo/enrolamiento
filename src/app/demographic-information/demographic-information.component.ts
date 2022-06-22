import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseDepartamentos } from '../_model/responseDepartamentos';
import { ResponseMunicipios } from '../_model/responseMunicipios';
import { ResponsePaises } from '../_model/responsePaises';
import { CatalogoService } from '../_service/catalogo.service';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';

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



  form!: FormGroup;
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

  RequestDatosPersona?: RequestDatosPersona;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private catalogoService: CatalogoService,
    private datosPersonaService: DatosPersonaService,
  ) { }


  ngOnInit(): void {
    this.load_icons();
    this.submitted = true;



    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;

        console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.RequestDatosPersona;


        this.domicilio = this.persona[0].PER_DOMICILIO;
        this.pais_nacimiento = this.persona[0].UGE_CODIGO_PAIS;
        this.lugar_nacimiento = this.persona[0].PER_LUGAR_DE_NACIMIENTO;
        this.municipio = this.persona[0].PER_ID_UGE_CODIGO;
        this.dui = this.persona[0].PER_NRO_DE_DOCUMENTO;
        this.departamento = this.persona[0].ID_DEPARTAMENTO;
        this.fecha_nacimiento = this.persona[0].PER_FECHA_DE_NACIMIENTO;


        if(this.persona[0].PER_ID_UGE_CODIGO != null)
        {
          this.catalogoService.getMunicipiosActuales(this.persona[0].PER_ID_UGE_CODIGO).subscribe((resp: ResponseMunicipios[]) => {
            this.responseMunicipios = resp;
            this.municipios = this.responseMunicipios;
          });


          this.catalogoService.getDepartamentosActuales(this.persona[0].PER_ID_UGE_CODIGO).subscribe((resp: ResponseDepartamentos[]) => {
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


  onChangePais(paisSeleccionado: string) {
    this.catalogoService.getDepartamentos(paisSeleccionado).subscribe((resp: ResponseDepartamentos[]) => {
      this.responseDepartamentos = resp;
      this.departamentos = this.responseDepartamentos;
      //console.log("con: "+JSON.stringify(this.departamentos));
      //console.log("sin: "+this.departamentos);
    });


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

    /* sessionStorage.setItem('domicilio',this.domicilio);
     sessionStorage.setItem('lugar_nacimiento',this.lugar_nacimiento);
     sessionStorage.setItem('departamento',this.departamento);
     sessionStorage.setItem('pais_nacimiento',this.pais_nacimiento);
     sessionStorage.setItem('municipio',this.municipio);
     sessionStorage.setItem('fecha_nacimiento',this.fecha_nacimiento);*/


    // guardando persona en tabla temporal
    let body = new RequestDatosPersona();
    body.domicilio = this.domicilio;
    body.lugar_nacimiento = this.lugar_nacimiento;
    body.municipio = this.municipio;
    body.fecha_nacimiento = this.fecha_nacimiento;

    if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
      console.log("body" + body);

      //insertado datos
      this.datosPersonaService.demographicInformation(body).subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;
      });
    }

    // this.router.navigate(['/photography']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  load_icons() {

    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";

    this.img_physic_information = document.getElementById("img_physic_information") as HTMLImageElement;
    this.img_physic_information.src = "../../assets/images/datos_fisicos_blue.svg";

    this.img_demographic_information = document.getElementById("img_demographic_information") as HTMLImageElement;
    this.img_demographic_information.src = "../../assets/images/datos_demograficos_blue.svg";
  }

}
