import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseColoresCabello } from '../_model/responseColoresCabello';
import { ResponseColoresOjo } from '../_model/responseColoresOjo';
import { ResponseColoresPiel } from '../_model/responseColoresPiel';
import { ResponseTiposBoca } from '../_model/responseTiposBoca';
import { ResponseTiposNariz } from '../_model/responseTiposNariz';
import { CatalogoService } from '../_service/catalogo.service';
import { RequestDatosPersona } from '../_model/requestDatosPersona';

import { DatosPersonaService } from '../_service/datos-persona.service';

@Component({
  selector: 'app-physic-information',
  templateUrl: './physic-information.component.html',
  styleUrls: ['./physic-information.component.css']
})
export class PhysicInformationComponent implements OnInit {

  //opctions icons
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;

  RequestDatosPersona?: RequestDatosPersona;

  persona: any;
  color_piel: any;

  form!: FormGroup;
  submitted = false;






  //datos fisicos
  anteojos!: any;
  colores_pieles!: any;
  tipos_bocas!: any;
  peso_lb!: string;
  lentes_contacto!: any;
  colores_ojos!: any;
  tipos_narices!: any;
  senales_especiales!: any;
  audifonos!: any;
  colores_cabellos!: any;
  estatura!: string;
  tipo_sangre!: string;
  opciones!: string[];
  tipos_sangre!: string[];



  responseTiposNariz?: ResponseTiposNariz[];
  tipos_nariz: ResponseTiposNariz[] = [];

  responseColoresPiel?: ResponseColoresPiel[];
  colores_piel: ResponseColoresPiel[] = [];

  responseTiposBoca?: ResponseTiposBoca[];
  tipos_boca: ResponseTiposBoca[] = [];

  responseColoresCabello?: ResponseColoresCabello[];
  colores_cabello: ResponseColoresCabello[] = [];

  responseColoresOjo?: ResponseColoresOjo[];
  colores_ojo: ResponseColoresOjo[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datosPersonaService: DatosPersonaService, private catalogoService: CatalogoService
  ) { }

  ngOnInit(): void {
    this.load_icons();
    this.submitted = true;

    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      console.log('session');

      // this.obtenerDatosPersona();


      this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;

        console.log('persona: ', this.RequestDatosPersona);
        this.persona = this.RequestDatosPersona;


        this.anteojos = this.persona[0].PER_ANTEOJOS;
        console.log("anteojos " + this.anteojos);
        this.tipos_narices = this.persona[0].PER_ID_TNA_CODIGO;
        this.colores_pieles = this.persona[0].PER_ID_CPI_CODIGO;

        this.senales_especiales = this.persona[0].PER_SENALES_ESPECIALES;
        this.tipos_bocas = this.persona[0].PER_ID_TBO_CODIGO;
        this.audifonos = this.persona[0].PER_AUDIFONO;
        this.peso_lb = this.persona[0].PER_PESO;
        this.colores_cabellos = this.persona[0].PER_ID_CCA_CODIGO;

        this.lentes_contacto = this.persona[0].PER_LENTES_DE_CONTACTO;
        this.estatura = this.persona[0].PER_ESTATURA;
        this.colores_ojos = this.persona[0].PER_ID_COJ_CODIGO;
        this.tipo_sangre = this.persona[0].PER_GRUPO_SANGUINEO;



      });


      this.obtenerColoresPiel();

    }


    this.opciones = ["SI", "NO"];
    this.tipos_sangre = ["A +", "A -", "B +", "B -", "AB +", "AB -", "O +", "O -"]


    //para combo de tipos de nariz
    this.catalogoService.getTiposNariz().subscribe((resp: ResponseTiposNariz[]) => {
      this.responseTiposNariz = resp;
      // console.log('response tipos nariz: ', this.responseTiposNariz);

      this.tipos_nariz = this.responseTiposNariz;


    });





    //para combo de tipos de boca
    this.catalogoService.getTiposBoca().subscribe((resp: ResponseTiposBoca[]) => {
      this.responseTiposBoca = resp;
      // console.log('response tipos boca: ', this.responseTiposBoca);

      this.tipos_boca = this.responseTiposBoca;


    });



    //para combo colores de cabello
    this.catalogoService.getColoresCabello().subscribe((resp: ResponseColoresCabello[]) => {
      this.responseColoresCabello = resp;
      //console.log('response colores de cabello: ', this.responseColoresCabello);

      this.colores_cabello = this.responseColoresCabello;


    });


    //para combo colores de ojos
    this.catalogoService.getColoresOjo().subscribe((resp: ResponseColoresOjo[]) => {
      this.responseColoresOjo = resp;
      // console.log('response colores de ojo: ', this.responseColoresOjo);

      this.colores_ojo = this.responseColoresOjo;


    });




    this.form = this.formBuilder.group(
      {
        cbo_anteojos: ['', Validators.required],
        cbo_tipos_narices: ['', Validators.required],
        cbo_colores_pieles: ['', Validators.required],
        cbo_senales_especiales: ['', Validators.required],
        cbo_tipos_bocas: ['', Validators.required],
        txt_audifonos: ['', Validators.required],
        txt_peso_libras: ['', Validators.required],
        cbo_colores_cabellos: ['', Validators.required],
        cbo_lentes_contacto: ['', Validators.required],
        txt_estatura: ['', Validators.required],
        cbo_colores_ojos: ['', Validators.required],
        cbo_tipo_sangre: ['', Validators.required],
      }

    )






  }


  async obtenerDatosPersona() {
    await this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
      this.RequestDatosPersona = resp;

      console.log('persona: ', this.RequestDatosPersona);
      this.persona = this.RequestDatosPersona;


      this.anteojos = this.persona[0].PER_ANTEOJOS;
      console.log("anteojos " + this.anteojos);
      this.tipos_narices = this.persona[0].PER_ID_TNA_CODIGO;
      this.colores_pieles = this.persona[0].PER_ID_CPI_CODIGO;

      this.senales_especiales = this.persona[0].PER_SENALES_ESPECIALES;
      this.tipos_bocas = this.persona[0].PER_ID_TBO_CODIGO;
      this.audifonos = this.persona[0].PER_AUDIFONO;
      this.peso_lb = this.persona[0].PER_PESO;
      this.colores_cabellos = this.persona[0].PER_ID_CCA_CODIGO;

      this.lentes_contacto = this.persona[0].PER_LENTES_DE_CONTACTO;
      this.estatura = this.persona[0].PER_ESTATURA;
      this.colores_ojos = this.persona[0].PER_ID_COJ_CODIGO;
      this.tipo_sangre = this.persona[0].PER_GRUPO_SANGUINEO;



    });

  }


  async obtenerColoresPiel() {
    //para combo colores de piel
    await this.catalogoService.getColoresPiel().subscribe((resp: ResponseColoresPiel[]) => {
      this.responseColoresPiel = resp;
      //console.log('response colores de piel: ', this.responseColoresPiel);
      console.log('response colores de piel: ', this.colores_pieles);
      this.colores_piel = this.responseColoresPiel;


    });

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  back() {
    this.router.navigate(['/home']);
  }

  guardar() {


    this.anteojos = this.form.controls['cbo_anteojos'].value;
    this.tipos_narices = this.form.controls['cbo_tipos_narices'].value;
    this.colores_pieles = this.form.controls['cbo_colores_pieles'].value;
    this.senales_especiales = this.form.controls['cbo_senales_especiales'].value;
    this.tipos_bocas = this.form.controls['cbo_tipos_bocas'].value;
    this.audifonos = this.form.controls['txt_audifonos'].value;
    this.peso_lb = this.form.controls['txt_peso_libras'].value;
    this.colores_cabellos = this.form.controls['cbo_colores_cabellos'].value;
    this.lentes_contacto = this.form.controls['cbo_lentes_contacto'].value;
    this.estatura = this.form.controls['txt_estatura'].value;
    this.colores_ojos = this.form.controls['cbo_colores_ojos'].value;
    this.tipo_sangre = this.form.controls['cbo_tipo_sangre'].value;

    console.log("anteojos: " + this.anteojos);
    console.log("nariz: " + this.tipos_narices);
    console.log("piel: " + this.colores_pieles);
    console.log("senales_especiales: " + this.senales_especiales);
    console.log("boca: " + this.tipos_bocas);
    console.log("audifonos: " + this.audifonos);
    console.log("peso_libras: " + this.peso_lb);
    console.log("cabello: " + this.colores_cabellos);
    console.log("lentes_contacto: " + this.lentes_contacto);
    console.log("ojos: " + this.colores_ojos);
    console.log("estatura: " + this.estatura);
    console.log("tipo_sangre: " + this.tipo_sangre);




    // guardando persona en tabla temporal
    let body = new RequestDatosPersona();
    body.anteojos = this.anteojos;
    body.nariz = this.tipos_narices;
    body.piel = this.colores_pieles;
    body.senales_especiales = this.senales_especiales;
    body.boca = this.tipos_bocas;
    body.audifonos = this.audifonos;
    body.peso_libras = this.peso_lb;
    body.cabello = this.colores_cabellos;
    body.lentes_contacto = this.lentes_contacto;
    body.ojos = this.colores_ojos;
    body.estatura = this.estatura;
    body.tipo_sangre = this.tipo_sangre;


    if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
      console.log("body" + body);

      //insertado datos
      this.datosPersonaService.physicInformation(body).subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;
      });
    }


    /*
        sessionStorage.setItem('anteojos', this.anteojos);
        sessionStorage.setItem('nariz', this.tipos_narices);
        sessionStorage.setItem('piel', this.colores_pieles);
        sessionStorage.setItem('senales_especiales', this.senales_especiales);
        sessionStorage.setItem('boca', this.tipos_bocas);
        sessionStorage.setItem('audifonos', this.audifonos);
        sessionStorage.setItem('peso_libras', this.peso_lb);
        sessionStorage.setItem('cabello', this.colores_cabellos);
        sessionStorage.setItem('lentes_contacto', this.lentes_contacto);
        sessionStorage.setItem('ojos', this.colores_ojos);
        sessionStorage.setItem('estatura', this.estatura);
        sessionStorage.setItem('tipo_sangre', this.tipo_sangre);*/



    this.router.navigate(['/demographic-information']);


  }

  load_icons() {
    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";

    this.img_physic_information = document.getElementById("img_physic_information") as HTMLImageElement;
    this.img_physic_information.src = "../../assets/images/datos_fisicos_blue.svg";
  }
}
