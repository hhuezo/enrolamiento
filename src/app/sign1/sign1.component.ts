import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import Swal from 'sweetalert2';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseDatosPersona } from '../_model/responseDatosPersona';
import { ResponseFirma } from '../_model/responseFirma';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { FirmaService } from '../_service/firma.service';
import { HuellaService } from '../_service/huella.service';
import { WebSocketService } from '../_service/web-socket.service';

@Component({
  selector: 'app-sign1',
  templateUrl: './sign1.component.html',
  styleUrls: ['./sign1.component.css']
})
export class Sign1Component implements OnInit {

  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg: string | undefined;

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;
  img_sign?: HTMLImageElement;

  btn_guardar?: HTMLElement;
  //btn_next?: HTMLElement;

  control_Print?: HTMLElement;

  responseFirma?: ResponseFirma;
  msjerr?: string;

  responseDatosPersona?: ResponseDatosPersona;
  RequestDatosPersona?: RequestDatosPersona;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];
  

  dui!: any;
  persona: any;
  sign: any;

  div_canva?: HTMLElement;
  div_sign?: HTMLElement;


  constructor(
    private firmaService: FirmaService,
    private router: Router,
    private datosPersonaService: DatosPersonaService,
    private huellaService: HuellaService,
    public webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {



     

    
    this.webSocketService.openWebSocket();
    
    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {

      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        console.log('persona actual: ', this.responseTmpDatosPersona);
        this.persona = this.responseTmpDatosPersona;

        this.dui = this.persona[0].dui;
        this.sign =this.persona[0].firma;


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

        if( this.sign != null && this.sign != '')
        {
          this.load_sign();
        }
        else{
          this.load_canva();
        }

      });


    }

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



  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.router.navigate(['/sign']);
    // this.signaturePad.clear();
    // this.load_canva();
    // this.btn_guardar = document.getElementById("btn_guardar") as HTMLElement;
    // this.btn_next= document.getElementById("btn_next") as HTMLElement;
    // this.btn_next.hidden = true;
    //this.btn_guardar.hidden = false;
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();

    let body = new RequestDatosPersona();
    body.firma = base64Data;
    body.dui = this.dui;
    //console.log(base64Data);

    if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null)   {
      //console.log("body" + body);

      //enviando  datos
      this.datosPersonaService.sign(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
      });
    }

    this.signatureImg = base64Data;
    this.router.navigate(['/fingerprint']);
    //this.router.navigate(['/carnet-print']);


  /*  let body = new RequestFirma();
    body.idPersona = '2';
    body.firma = base64Data;

    console.log("bodyFirma: ", body.firma);

   // console.log("bodyFirma: ", body);

    /*
    // this.serviceLogin =
    this.firmaService.guardarFirma(body).subscribe((resp: ResponseFirma) => {
      this.responseFirma = resp;
      console.log('response: ', this.responseFirma);

      if (this.responseFirma.val === '0') {

        //aqui guardo los datos de la persona temporalmente, esperando a que se termine el servicio de huella digital
        let body = new RequestDatosPersona();
        body.firma = "firma_persona";

        /*
          //datos personales
        body.nombre = sessionStorage.getItem('nombre')?.toString();
        body.ape_paterno = sessionStorage.getItem('ape_paterno')?.toString();
        body.ape_materno = sessionStorage.getItem('ape_materno')?.toString();
        body.ape_casada = sessionStorage.getItem('ape_casada')?.toString();
        body.dui = sessionStorage.getItem('dui')?.toString();
        body.fecha_emision_dui = sessionStorage.getItem('fecha_emision_dui')?.toString();
        body.ocupacion = sessionStorage.getItem('ocupacion')?.toString();
        body.fecha_vto_dui = sessionStorage.getItem('fecha_vto_dui')?.toString();
        body.email = sessionStorage.getItem('email')?.toString();
        body.estado_civil = sessionStorage.getItem('estado_civil')?.toString();
        body.genero = sessionStorage.getItem('genero')?.toString();
        body.telefono_celular = sessionStorage.getItem('telefono_celular')?.toString();



        //datos fisicos
        body.anteojos = sessionStorage.getItem('anteojos')?.toString();
        body.nariz = sessionStorage.getItem('nariz')?.toString();
        body.piel = sessionStorage.getItem('piel')?.toString();
        body.senales_especiales = sessionStorage.getItem('senales_especiales')?.toString();
        body.boca = sessionStorage.getItem('boca')?.toString();
        body.audifonos = sessionStorage.getItem('audifonos')?.toString();
        body.peso_libras = sessionStorage.getItem('peso_libras')?.toString();
        body.cabello = sessionStorage.getItem('cabello')?.toString();
        body.lentes_contacto = sessionStorage.getItem('lentes_contacto')?.toString();
        body.ojos = sessionStorage.getItem('ojos')?.toString();
        body.estatura = sessionStorage.getItem('estatura')?.toString();
        body.tipo_sangre = sessionStorage.getItem('tipo_sangre')?.toString();



        //datos demograficos
        body.domicilio = sessionStorage.getItem('domicilio')?.toString();
        body.lugar_nacimiento = sessionStorage.getItem('lugar_nacimiento')?.toString();
        body.departamento = sessionStorage.getItem('departamento')?.toString();
        body.pais_nacimiento = sessionStorage.getItem('pais_nacimiento')?.toString();
        body.municipio = sessionStorage.getItem('municipio')?.toString();
        body.fecha_nacimiento = sessionStorage.getItem('fecha_nacimiento')?.toString();


        body.foto = "foto_persona";
        body.firma = "firma_persona";
        body.pu_i = "pulgar_izquierdo";
        body.pu_d = "pulgar_derecho";

*/


   /*     this.datosPersonaService.guardarPersona(body).subscribe((resp: ResponseDatosPersona) => {
          this.responseDatosPersona = resp;
          console.log('response: ', this.responseDatosPersona);

          //alert('val= '+this.responseDatosPersona.val);

          if (this.responseDatosPersona.val === 0) {

            this.msjerr = "Persona guardada correctamente...";
            Swal.fire({
              icon: 'success',
              title: this.msjerr,
              confirmButtonText: 'ATRAS',
              confirmButtonColor: '#007bff',
              backdrop: false,
              position: 'center'
            });

            sessionStorage.setItem('firma', body.firma!);
            this.router.navigate(['/carnet-print']);
            //this.router.navigate(['/fingerprint']);
          } else {
            // this.msjerr = "Persona no pudo ser guardada, revise el json persona nuevamente";
            // Swal.fire({
            //   icon: 'error',
            //   title: this.msjerr,
            //   confirmButtonText: 'ATRAS',
            //   confirmButtonColor: '#007bff',
            //   backdrop: false,
            //   position: 'center'
            // });

            this.msjerr = "Persona guardada correctamente...";
            Swal.fire({
              icon: 'success',
              title: this.msjerr,
              confirmButtonText: 'ATRAS',
              confirmButtonColor: '#007bff',
              backdrop: false,
              position: 'center'
            });

            this.router.navigate(['/carnet-print']);

          }


        });



      } else if (this.responseFirma.val === '1') {
        this.msjerr = this.responseFirma.mensaje;

        // this.modalService.open(content);
        Swal.fire({
          icon: 'error',
          title: this.msjerr,
          confirmButtonText: 'ATRAS',
          confirmButtonColor: '#007bff',
          backdrop: false,
          position: 'center'
        });
      }
      else {
        this.msjerr = this.responseFirma.mensaje;

        // this.modalService.open(content);
        Swal.fire({
          icon: 'error',
          title: this.msjerr,
          confirmButtonText: 'ATRAS',
          confirmButtonColor: '#007bff',
          backdrop: false,
          position: 'center'
        });
      }


    });*/

    
  }

  link_print()
  {
    this.router.navigate(['/carnet-print']);
  }
  load_sign()
  {
    this.div_canva = document.getElementById("div_canva") as HTMLElement;
    this.div_sign= document.getElementById("div_sign") as HTMLElement;
    this.btn_guardar = document.getElementById("btn_guardar") as HTMLElement;
    //this.btn_next= document.getElementById("btn_next") as HTMLElement;
    this.div_sign.hidden = false;
    this.div_canva.hidden = true;
    //this.btn_next.hidden = false;
    this.btn_guardar.hidden = true;

  }

  load_canva()
  {
    this.div_canva = document.getElementById("div_canva") as HTMLElement;
    this.div_sign= document.getElementById("div_sign") as HTMLElement;
    this.div_sign.hidden = true;
    this.div_canva.hidden = false;

    this.btn_guardar = document.getElementById("btn_guardar") as HTMLElement;
    //this.btn_next= document.getElementById("btn_next") as HTMLElement;
    this.btn_guardar.hidden = false;
    //this.btn_next.hidden = true;
  }



  back() {
    this.router.navigate(['/home']);
  }

}
