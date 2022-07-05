import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequestBuscarHuella } from '../_model/requestBuscarHuella';
import { RequestInsertarHuella } from '../_model/requestInsertarHuella';
import { ResponseBuscarHuella } from '../_model/responseBuscarHuella';
import { ResponseIniciarHuella } from '../_model/responseIniciarHuella';
import { ResponseInsertarHuella } from '../_model/responseInsertarHuella';
import { ResponseLeerHuella } from '../_model/responseLeerHuella';
import { HuellaService } from '../_service/huella.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

  texto_boton?: string;

  constructor(
    private router: Router,
    private huellaService: HuellaService
  ) { }

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;
  img_sign?: HTMLImageElement;
  img_fingerprint?: HTMLImageElement;

  requestBuscarHuella?: RequestBuscarHuella;
  responseBuscarHuella?: ResponseBuscarHuella;
  responseInsertarHuella?: ResponseInsertarHuella;
  responseIniciarHuella?: ResponseIniciarHuella;
  responseLeerHuella?: ResponseLeerHuella;


  img_huella_jpg?: any;
  btn_capture_sign?: HTMLButtonElement;
  btn_guardar_active?: boolean;

  estado_blue?: boolean;
  estado_gray?: boolean;

  ngOnInit(): void {

    this.texto_boton = "Capturar Huella Izquierda";
    this.estado_blue = false;
    this.estado_gray = true;

    this.iniciarHuella();



    this.btn_guardar_active = true;


  }


  iniciarHuella(){
    //para combo de ocupaciones
    this.huellaService.iniciarHuella().subscribe((resp: ResponseIniciarHuella) => {
      this.responseIniciarHuella = resp;

      if (this.responseIniciarHuella.device === 'FG_ZF1')
      {

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos.. no puede usar el aparato lector de huella..',
          text: 'Su huella no puede ser leida por el lector de huella',
          showConfirmButton: false,
          timer: 3500,
        });
      }

    });


  }



  test(){
    console.log('Inicio capturando huella');

        // Convert canvas to dataURL and log to console
        const dataURL = this.img_huella_jpg;
        console.log('dataURL= '+dataURL);

        // Logs data:image/png;base64,wL2dvYWwgbW9yZ...

        // Convert to Base64 string
    //     const base64 = getBase64StringFromDataURL(dataURL);
    //     console.log(base64);

    // console.log('La imagen de la huella es: '+this.img_huella_jpg);

    console.log('Fin capturando huella');

  }

  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }



  public leerHuella() {

    if (this.texto_boton === "Capturar Huella Derecha"){
      this.estado_blue = true;
      this.estado_gray = false;
    }


    this.btn_capture_sign = document.getElementById("btn_capture_sign") as HTMLButtonElement;

    this.huellaService.leerHuella().subscribe((resp: ResponseLeerHuella) => {
      this.responseLeerHuella = resp;



      if (this.responseLeerHuella.fingerprint !== null)
      {

        console.log('la huella es: '+this.responseLeerHuella.fingerprint);
        // this.detenerHuella();

        this.texto_boton = "Capturar Huella Derecha";
        this.estado_blue = false;
        this.estado_gray = true;

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos.. no puede usar el aparato lector de huella..',
          text: 'Su huella no puede ser leida por el lector de huella',
          showConfirmButton: false,
          timer: 3500,
        });
      }

    });

  }

  ngOnDestroy() {
    this.responseLeerHuella
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




  cancelar(){
    // this.router.navigate(['lectura-licencia']);
    this.router.navigate(['sign']);

    // this.uninit();
    // this.apagarLuces();
  }


  back() {
    this.router.navigate(['/home']);
  }







}
