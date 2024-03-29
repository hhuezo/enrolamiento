import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseEstadosCivil } from '../_model/responseEstadosCivil';
import { ResponseGeneros } from '../_model/responseGeneros';
import { ResponseOcupaciones } from '../_model/responseOcupaciones';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { CatalogoService } from '../_service/catalogo.service';
import { DatosPersonaService } from '../_service/datos-persona.service';
import * as $ from 'jquery';
import { ChatMessageDto } from '../_model/ChatMessageDto';
import { WebSocketService } from '../_service/web-socket.service';
import { HuellaService } from '../_service/huella.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {

  //combos
  ocupaciones: any;
  responseOcupaciones?: ResponseOcupaciones;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];

  persona?: any;


  form!: FormGroup;
  submitted = false;

  nombre!: string;
  ape_paterno!: string;
  ape_materno!: string;
  ape_casada!: string;
  dui!: string;
  fecha_emision_dui!: string;
  ocupacion!: number;
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

  txt_input_user?: HTMLInputElement;
  txt_input_message?: HTMLInputElement;

  txt_input_nombre?: HTMLInputElement;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private catalogoService: CatalogoService,
    private datosPersonaService: DatosPersonaService,
    public webSocketService: WebSocketService,
    private huellaService: HuellaService
  ) { }


  ngOnInit(): void {

    this.txt_input_nombre = document.getElementById("txt_nombre") as HTMLInputElement;

    this.txt_input_user = document.getElementById("input-user") as HTMLInputElement;


    

    this.webSocketService.openWebSocket();
    
    $(document).ready(function(){
      //alert('funcion jquery');

      $('#txt_nombre').keyup(function (e) {
        if (e.keyCode === 13) {           
          $("#input-user").val("Nombre");
          var nombre = $('#txt_nombre').val();
          $("#input-message").val(nombre!);          
          $('#btn_send').click();  

          $('#txt_ape_paterno').focus();                      
        }
      });

      $('#txt_ape_paterno').keyup(function (e) {
        if (e.keyCode === 13) {           
          $("#input-user").val("Apellido Paterno");
          var apellidoPaterno = $('#txt_ape_paterno').val();
          $("#input-message").val(apellidoPaterno!);          
          $('#btn_send').click();  

           $('#txt_ape_materno').focus();                      
        }
      });

      $('#txt_ape_materno').keyup(function (e) {
        if (e.keyCode === 13) {  
          $("#input-user").val("Apellido Materno");
          var apellidoMaterno = $('#txt_ape_materno').val();
          $("#input-message").val(apellidoMaterno!);          
          $('#btn_send').click();

           $('#txt_ape_casada').focus();                      
        }
      });

      $('#txt_ape_casada').keyup(function (e) {
        if (e.keyCode === 13) {     
          $("#input-user").val("Apellido Casada");
          var apellidoCadada = $('#txt_ape_casada').val();
          $("#input-message").val(apellidoCadada!);          
          $('#btn_send').click();

           $('#txt_dui').focus();                      
        }
      });

      $('#txt_dui').keyup(function (e) {
        if (e.keyCode === 13) {  
          $("#input-user").val("DUI");
          var dui = $('#txt_dui').val();
          $("#input-message").val(dui!);          
          $('#btn_send').click();

           $('#txt_fecha_emision_dui').focus();                      
        }
      });

      $('#txt_fecha_emision_dui').keyup(function (e) {
        if (e.keyCode === 13) {   
          $("#input-user").val("Fecha Emision DUI");
          var fechaEmisionDUI = $('#txt_fecha_emision_dui').val();
          $("#input-message").val(fechaEmisionDUI!);          
          $('#btn_send').click();

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
            $("#input-user").val("Ocupacion");            
            var ocupacion = $("#cbo_ocupacion option:selected").text();
            $("#input-message").val(ocupacion!);          
            $('#btn_send').click();

            $('#txt_fecha_vto_dui').focus();                      
        
      });

      $('#txt_fecha_vto_dui').keyup(function (e) {
        if (e.keyCode === 13) {           
          $("#input-user").val("Fecha Vento DUI");
          var fechaVentoDUI = $('#txt_fecha_vto_dui').val();
          $("#input-message").val(fechaVentoDUI!);          
          $('#btn_send').click();

           $('#txt_email').focus();                      
        }
      });

      $('#txt_email').keyup(function (e) {
        if (e.keyCode === 13) {  
          $("#input-user").val("Email");
          var email = $('#txt_email').val();
          $("#input-message").val(email!);          
          $('#btn_send').click();

           $('#cbo_estado_civil').focus();                      
        }
      });

      $('#cbo_estado_civil').change(function (e) {
        $("#input-user").val("Estado civil");
        var estadoCivil = $("#cbo_estado_civil option:selected").text();        
        $("#input-message").val(estadoCivil!);          
        $('#btn_send').click();

           $('#cbo_genero').focus();                              
      });

      $('#cbo_genero').change(function (e) {        
          $("#input-user").val("Genero");
          var genero = $("#cbo_genero option:selected").text();
          $("#input-message").val(genero!);          
          $('#btn_send').click();
           $('#txt_telefono_celular').focus();                              
      });

      
      $('#txt_telefono_celular').keyup(function (e) {
        if (e.keyCode === 13) {  
          $("#input-user").val("Telefono Celular");
          var genero = $('#txt_telefono_celular').val();
          $("#input-message").val(genero!);          
          $('#btn_send').click();

           $('#btn_guardar').focus();                      
        }
      });

      


    });


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
      console.log('sin session');
    }
    else {
      console.log('session');
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



      });

      this.detenerHuella();


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




  sendMessage() {

    this.txt_input_user = document.getElementById("input-user") as HTMLInputElement;
    this.txt_input_message = document.getElementById("input-message") as HTMLInputElement;

    const chatMessageDto = new ChatMessageDto(this.txt_input_user.value, this.txt_input_message.value);
    this.webSocketService.sendMessage(chatMessageDto);
    //sendForm.controls.message.reset();
    //sendForm.controls.message.reset();
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
      this.datosPersonaService.createPersona(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.persona = resp;
        sessionStorage.setItem('dui', this.dui);
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

  load_icons() {
    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";
  }


  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

}
