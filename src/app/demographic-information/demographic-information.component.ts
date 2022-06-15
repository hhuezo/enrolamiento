import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsePaises } from '../_model/responsePaises';
import { CatalogoService } from '../_service/catalogo.service';

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

  paises: any;

  form!:FormGroup;
  submitted = false;

  domicilio!: string;
  pais_nacimiento!: string;
  lugar_nacimiento!: string;
  municipio!: string;
  departamento!: string;
  fecha_nacimiento!: string;

  responsePaises?: ResponsePaises;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private catalogoService: CatalogoService
  ) { }


  ngOnInit(): void {
    this.load_icons();
    this.submitted = true;

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


    this.catalogoService.getPaises().subscribe((resp: ResponsePaises) => { this.responsePaises = resp;
      console.log('paises: ', this.responsePaises);
      this.paises = this.responsePaises  ;


    });



  }

  back(){
    this.router.navigate(['/home']);
  }

  guardar(){
    this.domicilio = this.form.controls['txt_domicilio'].value;
    this.lugar_nacimiento = this.form.controls['txt_lugar_nacimiento'].value;
    this.departamento = this.form.controls['cbo_departamento'].value;
    this.pais_nacimiento = this.form.controls['cbo_pais_nacimiento'].value;
    this.municipio = this.form.controls['cbo_municipio'].value;
    this.fecha_nacimiento = this.form.controls['txt_fecha_nacimiento'].value;

    console.log('Domicilio : '+this.domicilio);
    console.log('Lugar de Nacimiento :'+ this.lugar_nacimiento);
    console.log('Departamento: '+this.departamento);
    console.log('Pais de Nacimiento: '+ this.pais_nacimiento);
    console.log('Municipio: '+ this.municipio);
    console.log('Fecha Nacimiento: '+ this.fecha_nacimiento);

    sessionStorage.setItem('domicilio',this.domicilio);
    sessionStorage.setItem('lugar_nacimiento',this.lugar_nacimiento);
    sessionStorage.setItem('departamento',this.departamento);
    sessionStorage.setItem('pais_nacimiento',this.pais_nacimiento);
    sessionStorage.setItem('municipio',this.municipio);
    sessionStorage.setItem('fecha_nacimiento',this.fecha_nacimiento);



    this.router.navigate(['/photography']);
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
