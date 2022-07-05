import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { RequestFoto } from '../_model/requestFoto';
import { FotoService } from '../_service/foto.service';
import { Router } from '@angular/router';
import { ResponseFoto } from '../_model/responseFoto';

import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { HuellaService } from '../_service/huella.service';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {
  seconds: number | any;
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage | any;
  div_cam?: HTMLElement;
  div_photo?: HTMLElement;
  div_photo2?: HTMLElement;

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];


  msjerr?: string;
  foto?: any;
  dui!: any;
  persona: any;

  responseFoto?: ResponseFoto;

  constructor(
    private fotoService: FotoService,
    private router: Router,
    private datosPersonaService: DatosPersonaService,
    private huellaService: HuellaService
  ) { }

  ngOnInit(): void {


    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        //console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.responseTmpDatosPersona;

        this.dui = this.persona[0].dui;
        this.foto =this.persona[0].foto;


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



        if( this.foto != null && this.foto != '')
        {
          //console.log('foto actualll: ', this.foto);
          this.load_photo();
        }

      });


    }

    this.hide_photo();
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



  clean() {
    this.webcamImage.imageAsDataUrl = "";
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









  guardar() {

    let body = new RequestDatosPersona();
    body.dui = this.dui;
    body.foto = this.foto;
   //console.log("body: " +  body.foto);
   if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
      //console.log("body" + body);

      //enviando  datos
      this.datosPersonaService.photography(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
      });
    }

    this.router.navigate(['/sign']);
  }



  takePicture(): void {

    this.seconds = 5;
    setTimeout(() => {
      this.seconds = 4;
      setTimeout(() => {
        this.seconds = 3;
        setTimeout(() => {
          this.seconds = 2;
          setTimeout(() => {
            this.seconds = 1
            setTimeout(() => {
              this.trigger.next();
              this.seconds = null;
              this.hide_cam();
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
    this.hide_photo();
  }


  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    //Este es el base64 a guardar en la base de datos usando un servicio -> webcamImage.imageAsDataUrl
    //this.foto = webcamImage;



    this.foto = webcamImage.imageAsDataUrl;
    //console.log("esta es la foto "+this.foto);

  }
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  //title = 'gfgangularwebcam';

  load_photo()
  {
    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_photo2 = document.getElementById("div_photo2") as HTMLElement;
    this.div_cam.hidden = true;
    this.div_photo2.hidden = false;
    this.div_photo.hidden = true;
  }

  hide_cam() {

    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_photo2 = document.getElementById("div_photo2") as HTMLElement;
    this.div_cam.hidden = true;
    this.div_photo2.hidden = true;
    this.div_photo.hidden = false;
  }



  hide_photo() {
    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_photo2 = document.getElementById("div_photo2") as HTMLElement;
    this.div_cam.hidden = false;
    this.div_photo.hidden = true;
    this.div_photo2.hidden = true;
  }





  back() {
    this.router.navigate(['/home']);
  }

}
