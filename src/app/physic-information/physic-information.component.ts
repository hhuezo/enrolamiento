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
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import * as $ from 'jquery';
import { HuellaService } from '../_service/huella.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-physic-information',
  templateUrl: './physic-information.component.html',
  styleUrls: ['./physic-information.component.css']
})
export class PhysicInformationComponent implements OnInit {

  //opctions icons
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

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
    private datosPersonaService: DatosPersonaService, 
    private catalogoService: CatalogoService,
    private huellaService: HuellaService
  ) { }

  ngOnInit(): void {


    $(document).ready(function(){
      //alert('funcion jquery');

      $('#cbo_anteojos').change(function (e) {
        
           $('#cbo_tipos_narices').focus();                      
        
      });

      $('#cbo_tipos_narices').change(function (e) {
        
           $('#cbo_colores_pieles').focus();                      
        
      });

      $('#cbo_colores_pieles').change(function (e) {
        
           $('#cbo_senales_especiales').focus();                      
        
      });

      $('#cbo_senales_especiales').change(function (e) {
        
           $('#cbo_tipos_bocas').focus();                      
        
      });

      $('#cbo_tipos_bocas').change(function (e) {
        
           $('#cbo_audifonos').focus();                      
        
      });

      $('#cbo_audifonos').change(function (e) {
         
           $('#txt_peso_libras').focus();                      
        
      });

      $('#txt_peso_libras').keyup(function (e) {
        if (e.keyCode === 13) {           
           $('#cbo_colores_cabellos').focus();                      
        }
      });

      $('#cbo_colores_cabellos').change(function (e) {
        
           $('#cbo_lentes_contacto').focus();                      
        
      });

      $('#cbo_lentes_contacto').change(function (e) {
        
           $('#txt_estatura').focus();                      
        
      });

      $('#txt_estatura').keyup(function (e) {
        if (e.keyCode === 13) {           
           $('#cbo_colores_ojos').focus();                      
        }
      });

      $('#cbo_colores_ojos').change(function (e) {
        
           $('#cbo_tipo_sangre').focus();                      
        
      });

      
      $('#cbo_tipo_sangre').change(function (e) {
        
           $('#btn_guardar').focus();                      
        
      });

      


    });


    this.load_icons();
    this.submitted = true;

    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      console.log('session');

      // this.obtenerDatosPersona();


      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona: ', this.responseTmpDatosPersona);
        this.persona = this.responseTmpDatosPersona;


        this.anteojos = this.persona[0].anteojos;
        console.log("anteojos " + this.anteojos);
        this.tipos_narices = this.persona[0].nariz;
        this.colores_pieles = this.persona[0].piel;

        this.senales_especiales = this.persona[0].senales_especiales;
        this.tipos_bocas = this.persona[0].boca;
        this.audifonos = this.persona[0].audifonos;
        this.peso_lb = this.persona[0].peso_libras;
        this.colores_cabellos = this.persona[0].cabello;

        this.lentes_contacto = this.persona[0].lentes_contacto;
        this.estatura = this.persona[0].estatura;
        this.colores_ojos = this.persona[0].ojos;
        this.tipo_sangre = this.persona[0].tipo_sangre;



      });



    }


    this.opciones = ["SI", "NO"];
    this.tipos_sangre = ["A +","A -","B +","B -","AB +","AB -","O +","O -"];



    //para combo colores de piel
    this.catalogoService.getColoresPiel().subscribe((resp: ResponseColoresPiel[]) => { this.responseColoresPiel = resp;
      //console.log('response colores de piel: ', this.responseColoresPiel);
      console.log('response colores de piel: ', this.colores_pieles);
      this.colores_piel = this.responseColoresPiel;


    });


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
        cbo_audifonos: ['', Validators.required],
        txt_peso_libras: ['', Validators.required],
        cbo_colores_cabellos: ['', Validators.required],
        cbo_lentes_contacto: ['', Validators.required],
        txt_estatura: ['', Validators.required],
        cbo_colores_ojos: ['', Validators.required],
        cbo_tipo_sangre: ['', Validators.required],
      }

    )



    this.detenerHuella();


  }



  detenerHuella(){
    //para combo de ocupaciones
    this.huellaService.detenerHuella().subscribe((resp: any) => {
      
      console.log('resp= '+resp);
      if (resp !== 0)
      {        
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos.. el aparato lector de huella, no púdo ser detenido',
          text: 'No se puede detener el lector de huella',
          showConfirmButton: false,
          timer: 3500,
        });
      }
      else{
      console.log('El aparato pudo ser detenido');
      }

    });


  }



  async obtenerDatosPersona() {
    await this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
      this.responseTmpDatosPersona = resp;

      console.log('persona: ', this.responseTmpDatosPersona);
      this.persona = this.responseTmpDatosPersona;


      this.anteojos = this.persona[0].anteojos;
      console.log("anteojos " + this.anteojos);
      this.tipos_narices = this.persona[0].nariz;
      this.colores_pieles = this.persona[0].piel;

      this.senales_especiales = this.persona[0].senales_especiales;
      this.tipos_bocas = this.persona[0].boca;
      this.audifonos = this.persona[0].audifonos;
      this.peso_lb = this.persona[0].peso_libras;
      this.colores_cabellos = this.persona[0].cabello;

      this.lentes_contacto = this.persona[0].lentes_contacto;
      this.estatura = this.persona[0].estatura;
      this.colores_ojos = this.persona[0].ojos;
      this.tipo_sangre = this.persona[0].tipo_sangre;



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
    this.audifonos = this.form.controls['cbo_audifonos'].value;
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
      this.datosPersonaService.physicInformation(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
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
