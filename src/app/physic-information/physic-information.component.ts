import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { WebSocketService } from '../_service/web-socket.service';
import { ChatMessageDto } from '../_model/chatMessageDto';


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

  form!: UntypedFormGroup;
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

  estado: any;



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



  txt_input_user?: HTMLInputElement;
  txt_input_message?: HTMLInputElement;




  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private datosPersonaService: DatosPersonaService, 
    private catalogoService: CatalogoService,
    private huellaService: HuellaService,
    private webSocketService: WebSocketService,
  ) { }



  ngOnInit(): void {

    this.webSocketService.openWebSocket();
    this.submitted = true;


    this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
      this.responseTmpDatosPersona = resp;

      //console.log('persona: ', this.responseTmpDatosPersona);
      this.persona = this.responseTmpDatosPersona;


      this.anteojos = this.persona[0].anteojos;
      //onsole.log("anteojos " + this.anteojos);
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




    $(document).ready(function(){
      //alert('funcion jquery');


      $('#cbo_anteojos').change(function (e) {
        $("#input-user").val("Anteojos");
        const anteojos = $("#cbo_anteojos option:selected").text();        
        $("#input-message").val(anteojos!);          
        $('#btn_send').click();

        $('#cbo_tipos_narices').focus();
      });

      $('#cbo_tipos_narices').change(function (e) {
        $("#input-user").val("Narices");
        const narices = $("#cbo_tipos_narices option:selected").text();        
        $("#input-message").val(narices!);          
        $('#btn_send').click();

        $('#cbo_colores_pieles').focus();
      });

      $('#cbo_colores_pieles').change(function (e) {
        $("#input-user").val("Pieles");
        const pieles = $("#cbo_colores_pieles option:selected").text();        
        $("#input-message").val(pieles!);          
        $('#btn_send').click();

        $('#cbo_senales_especiales').focus();
      });

      $('#cbo_senales_especiales').change(function (e) {
        $("#input-user").val("Señales especiales");
        const senalesEspeciales = $("#cbo_senales_especiales option:selected").text();        
        $("#input-message").val(senalesEspeciales!);          
        $('#btn_send').click();

        $('#cbo_tipos_bocas').focus();
      });

      $('#cbo_tipos_bocas').change(function (e) {
        $("#input-user").val("Tipos de boca");
        const bocas = $("#cbo_tipos_bocas option:selected").text();        
        $("#input-message").val(bocas!);          
        $('#btn_send').click();

        $('#cbo_audifonos').focus();
      });

      $('#cbo_audifonos').change(function (e) {
        $("#input-user").val("Audifonos");
        const audifonos = $("#cbo_audifonos option:selected").text();        
        $("#input-message").val(audifonos!);          
        $('#btn_send').click();

        $('#txt_peso_libras').focus();
      });



      $('#txt_peso_libras').keyup(function (e) {
        if (e.keyCode === 13) {
          $("#input-user").val("Peso en libras");
          const audifonos = $('#txt_peso_libras').val();
          $("#input-message").val(audifonos!);          
          $('#btn_send').click();

          $('#cbo_colores_cabellos').focus();
        }
      });


      $('#cbo_colores_cabellos').change(function (e) {
        $("#input-user").val("Cabellos");
        const cabellos = $("#cbo_colores_cabellos option:selected").text();        
        $("#input-message").val(cabellos!);          
        $('#btn_send').click();

        $('#cbo_lentes_contacto').focus();
      });


      $('#cbo_lentes_contacto').change(function (e) {
        $("#input-user").val("Lentes de contacto");
        const lentesContacto = $("#cbo_lentes_contacto option:selected").text();        
        $("#input-message").val(lentesContacto!);          
        $('#btn_send').click();

        $('#txt_estatura').focus();
      });


      $('#txt_estatura').keyup(function (e) {
        if (e.keyCode === 13) {
          $("#input-user").val("Estatura");
          const estatura = $('#txt_estatura').val();
          $("#input-message").val(estatura!);          
          $('#btn_send').click();

          $('#cbo_colores_ojos').focus();
        }
      });

      $('#cbo_colores_ojos').change(function (e) {
        $("#input-user").val("Color de ojos");
        const coloresOjo = $("#cbo_colores_ojos option:selected").text();        
        $("#input-message").val(coloresOjo!);          
        $('#btn_send').click();

        $('#cbo_tipo_sangre').focus();
      });


      $('#cbo_tipo_sangre').change(function (e) {
        $("#input-user").val("Tipo de sangre");
        const tipoSangre = $("#cbo_tipo_sangre option:selected").text();        
        $("#input-message").val(tipoSangre!);          
        $('#btn_send').click();

        $('#btn_guardar').focus();
      });





    });



    this.opciones = ["SI", "NO"];
    this.tipos_sangre = ["A +","A -","B +","B -","AB +","AB -","O +","O -"];



    //para combo colores de piel
    this.catalogoService.getColoresPiel().subscribe((resp: ResponseColoresPiel[]) => { this.responseColoresPiel = resp;
      //console.log('response colores de piel: ', this.responseColoresPiel);
     // console.log('response colores de piel: ', this.colores_pieles);
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


  sendMessage() {

    //console.log('uno');

    this.txt_input_user = document.getElementById("input-user") as HTMLInputElement;
    this.txt_input_message = document.getElementById("input-message") as HTMLInputElement;

    //console.log('dos');

    const chatMessageDto = new ChatMessageDto(this.txt_input_user.value, this.txt_input_message.value);
    
    //console.log('tres');
    
    this.webSocketService.sendMessage(chatMessageDto);
    //console.log('cuatro');

    //sendForm.controls.message.reset();
    //sendForm.controls.message.reset();
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
      //console.log("body" + body);

      //insertado datos
      this.datosPersonaService.physicInformation(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
      });
    }

    this.router.navigate(['/demographic-information']);


  }


}
