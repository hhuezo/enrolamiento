import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { RequestFoto } from '../_model/requestFoto';
import { FotoService } from '../_service/foto.service';
import { Router } from '@angular/router';
import { ResponseFoto } from '../_model/responseFoto';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.css']
})
export class PhotographyComponent implements OnInit {
  seconds: number | any;
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage | any;
  div_cam? : HTMLElement;
  div_photo? : HTMLElement;

  msjerr?: string;
  foto?: string;

  responseFoto?: ResponseFoto;

  constructor(
    private fotoService: FotoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.hide_photo();
  }


  clean(){
    this.webcamImage.imageAsDataUrl = "";
  }

  guardar(){
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


    });
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
    console.log(webcamImage.imageAsDataUrl);

    this.foto = webcamImage.imageAsDataUrl;
    
  }
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  //title = 'gfgangularwebcam';



  hide_cam()
  {
   
   this.div_cam = document.getElementById("div_cam") as HTMLElement;
   this.div_photo = document.getElementById("div_photo") as HTMLElement;
   this.div_cam.hidden = true;
   this.div_photo.hidden = false;
  }
    


  hide_photo()
  {
    this.div_cam = document.getElementById("div_cam") as HTMLElement;
    this.div_photo = document.getElementById("div_photo") as HTMLElement;
    this.div_cam.hidden = false;
    this.div_photo.hidden = true;
  }


}
