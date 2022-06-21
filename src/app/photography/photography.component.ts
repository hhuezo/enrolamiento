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

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;

  RequestDatosPersona?: RequestDatosPersona;

  msjerr?: string;
  foto?: string;
  dui!: any;
  persona: any;

  responseFoto?: ResponseFoto;

  constructor(
    private fotoService: FotoService,
    private router: Router,private datosPersonaService: DatosPersonaService
  ) { }

  ngOnInit(): void {
    this.load_icons();
    this.hide_photo();

    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;

        //console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.RequestDatosPersona;

        this.dui = this.persona[0].PER_NRO_DE_DOCUMENTO;

      });


    }
  }


  clean() {
    this.webcamImage.imageAsDataUrl = "";
  }

  guardar() {

    let body = new RequestDatosPersona();
    body.dui = this.dui;
    body.foto = this.foto;
   //console.log("body: " +  body.foto);
   if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
      console.log("body" + body);

      //enviando  datos
      this.datosPersonaService.photography(body).subscribe((resp: RequestDatosPersona) => {
        this.RequestDatosPersona = resp;
      });
    }

    /*
    let body = new RequestFoto();
    // body.documento = this.usuario;
    // body.password = this.encodedpw;
    body.idPersona = '2';
    body.foto = this.foto;

    console.log("bodyFoto: ", body);

    // this.serviceLogin =
    this.fotoService.guardarFoto(body).subscribe((resp: ResponseFoto) => { this.responseFoto = resp;
    console.log('response: ', this.responseFoto);

      if (this.responseFoto.val === '0') {

          sessionStorage.setItem('foto',this.foto!);
          this.router.navigate(['/sign']);

      } else if (this.responseFoto.val === '1') {
          this.msjerr = this.responseFoto.mensaje;

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
        this.msjerr = this.responseFoto.mensaje;

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



  hide_cam() {

    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_cam.hidden = true;
    this.div_photo.hidden = false;
  }



  hide_photo() {
    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_cam.hidden = false;
    this.div_photo.hidden = true;
  }



  load_icons() {

    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";

    this.img_physic_information = document.getElementById("img_physic_information") as HTMLImageElement;
    this.img_physic_information.src = "../../assets/images/datos_fisicos_blue.svg";

    this.img_demographic_information = document.getElementById("img_demographic_information") as HTMLImageElement;
    this.img_demographic_information.src = "../../assets/images/datos_demograficos_blue.svg";

    this.img_photography = document.getElementById("img_photography") as HTMLImageElement;
    this.img_photography.src = "../../assets/images/datos_foto_blue.svg";

  }

}
