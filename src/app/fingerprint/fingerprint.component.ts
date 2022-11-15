<<<<<<< HEAD
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import Swal from 'sweetalert2';
import { RequestBuscarHuella } from '../_model/requestBuscarHuella';
import { RequestValidarHuella } from '../_model/requestValidarHuella';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseBuscarHuella } from '../_model/responseBuscarHuella';
import { ResponseIniciarHuella } from '../_model/responseIniciarHuella';
import { ResponseInsertarHuella } from '../_model/responseInsertarHuella';
import { ResponseLeerHuella } from '../_model/responseLeerHuella';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { HuellaService } from '../_service/huella.service';
import { RequestCalidadHuella } from '../_model/requestCalidadHuella';
import { ResponseCalidadHuella } from '../_model/responseCalidadHuella';
=======
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
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

<<<<<<< HEAD
  showSignValid = false;
  showSignError = false;

  showSignValid1 = false;
  showSignValid2 = false;
  showSignValid3 = false;
  showSignValid4 = false;

  showSignValid5 = false;
  showSignValid6 = false;
  showSignValid7 = false;
  showSignValid8 = false;

  
  cuentaIzq?: number;
  cuentaDer?: number;

  @Input() options: AnimationOptions = {
    path: '/assets/lottie/81116-fingerprint-biometric-success-blue.json'
  };

  @Input() options2: AnimationOptions = {
    path: '/assets/lottie/81121-fingerprint-biometric-failed-red.json'
  };
  
  @Input() options3: AnimationOptions = {
    path: '/assets/lottie/Huella-1.json'
  };
  
  @Input() options4: AnimationOptions = {
    path: '/assets/lottie/Huella-2.json'
  };
  
  @Input() options5: AnimationOptions = {
    path: '/assets/lottie/Huella-3.json'
  };
  
  @Input() options6: AnimationOptions = {
    path: '/assets/lottie/Huella-completa.json'
  };


  @Input() options7: AnimationOptions = {
    path: '/assets/lottie/Huella-1-r.json'
  };
  
  @Input() options8: AnimationOptions = {
    path: '/assets/lottie/Huella-2-r.json'
  };
  
  @Input() options9: AnimationOptions = {
    path: '/assets/lottie/Huella-3-r.json'
  };
  
  @Input() options10: AnimationOptions = {
    path: '/assets/lottie/Huella-completa-r.json'
  };

  @Output() animationCreated = new EventEmitter();

=======
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
  texto_boton?: string;

  constructor(
    private router: Router,
<<<<<<< HEAD
    private huellaService: HuellaService,
    private _sanitizer: DomSanitizer,
    private datosPersonaService: DatosPersonaService
  ) { }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.animationCreated.emit(animationItem);
  }
=======
    private huellaService: HuellaService
  ) { }
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

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


<<<<<<< HEAD
  img_huella_left?: any;
  img_huella_right?: any;

  img_huella_left_save?: any;
  img_huella_right_save?: any;

  img_huella_left_save_bd?: any;
  img_huella_right_save_bd?: any;


  btn_capture_sign?: HTMLButtonElement;
  btn_guardar_disactive?: boolean;

  estado_blue?: boolean;
  estado_gray?: boolean;
  opcion_huella?: number;

  btn_class_guardar?: string;

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];
  dui!: any;
  persona: any;

  responseCalidadHuella?: ResponseCalidadHuella;
=======
  img_huella_jpg?: any;
  btn_capture_sign?: HTMLButtonElement;
  btn_guardar_active?: boolean;

  estado_blue?: boolean;
  estado_gray?: boolean;
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

  ngOnInit(): void {

    this.texto_boton = "Capturar Huella Izquierda";
<<<<<<< HEAD
    this.btn_class_guardar = 'btn_gray';
    this.btn_guardar_disactive = true;

    this.cuentaIzq = 0;
    this.cuentaDer = 0;

    this.iniciarHuella();

    if (sessionStorage.getItem('dui') || sessionStorage.getItem('dui') != null) {
      //console.log('sin session');

      //console.log('session');
      this.datosPersonaService.getPersona().subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;

        //console.log('persona actual: ', this.RequestDatosPersona);
        this.persona = this.responseTmpDatosPersona;

        this.dui = this.persona[0].dui;
        this.img_huella_left =this.persona[0].pu_i;
        this.img_huella_right =this.persona[0].pu_d;
        //console.log('foto actual: ', this.foto);

        // if( this.img_huella_left != null && this.img_huella_left != '')
        // {
        //   this.load_photo();
        // }

      });


    }
=======
    this.estado_blue = false;
    this.estado_gray = true;
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

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

    if (this.texto_boton === "Capturar Huella Izquierda" || this.texto_boton === "Capturar Huella Derecha"){
      this.btn_class_guardar = 'btn_gray';
      this.btn_guardar_disactive = true;  
    
    }else{
      this.btn_class_guardar = 'btn_blue';
      this.btn_guardar_disactive = false;
    
    }


    this.btn_capture_sign = document.getElementById("btn_capture_sign") as HTMLButtonElement;

    this.huellaService.leerHuella().subscribe((resp: ResponseLeerHuella) => {
      this.responseLeerHuella = resp;

      

      if (this.responseLeerHuella.fingerprint !== null)
      {
        


        console.log('la huella es: '+this.responseLeerHuella.fingerprint);
        // this.detenerHuella();
        if (this.texto_boton === 'Capturar Huella Izquierda'){
          this.img_huella_left = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/bmp;base64,' 
          + this.responseLeerHuella.fingerprint);

          this.img_huella_left_save_bd = 'data:image/bmp;base64,' + this.responseLeerHuella.fingerprint;
          this.img_huella_left_save = this.responseLeerHuella.fingerprint;

          this.validarCalidadHuellaIzq();


          //alert('this.cuentaIzq= '+this.cuentaIzq);

          //this.guardarPUI();
          if (this.cuentaIzq == 3) {
            this.texto_boton = "Capturar Huella Derecha";
          }
    

        }else{
          if (this.texto_boton === 'Capturar Huella Derecha'){
            this.img_huella_right = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/bmp;base64,' 
            + this.responseLeerHuella.fingerprint);

            this.img_huella_right_save_bd = 'data:image/bmp;base64,' + this.responseLeerHuella.fingerprint;
            this.img_huella_right_save = this.responseLeerHuella.fingerprint;

            this.validarCalidadHuellaDer();

            //this.guardarPUD();

            //alert('this.cuentaDer= '+this.cuentaDer);

            if (this.cuentaDer == 3) {
              this.texto_boton = "Continuar";
            }

            
          }else{
            if (this.texto_boton === 'Continuar') {
              this.guardarPUI();
              this.guardarPUD();
              this.router.navigate(['/carnet-print']);
            }

          }
        }

        
        

        
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




validarPUI() {

  let body = new RequestValidarHuella();
  body.identifier = this.dui;
  body.fingerPrint = this.img_huella_left_save;
  body.position = "L";
 //console.log("body: " +  body.foto);
 if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
    console.log("body" + body);

    //enviando  datos
    this.datosPersonaService.validar_calidad_huella(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
      this.responseTmpDatosPersona = resp;
    });
  }

  
}


validarCalidadHuellaIzq() {

  let body = new RequestCalidadHuella();
  body.fingerPrint = this.img_huella_left_save;

    //console.log("body: " +  body.foto);

    //enviando  datos
    this.datosPersonaService.validar_calidad_huella(body).subscribe((resp: ResponseCalidadHuella) => {
      this.responseCalidadHuella = resp;


      if (this.responseCalidadHuella.quality == 1 || this.responseCalidadHuella.quality == 2 || this.responseCalidadHuella.quality == 3){
        this.cuentaIzq = this.cuentaIzq!  + 1;
        //this.showSignValid = true;
      }else{
        this.showSignError = true;
      }

      //alert(this.cuenta);

      if (this.cuentaIzq == 1) {
        this.showSignValid1 = true;
        this.showSignValid2 = false;
        this.showSignValid3 = false;
        this.showSignValid4 = false;
      }

      if (this.cuentaIzq == 2) {
        this.showSignValid1 = false;
        this.showSignValid2 = true;
        this.showSignValid3 = false;
        this.showSignValid4 = false;
      }

      if (this.cuentaIzq == 3) {
        this.showSignValid1 = false;
        this.showSignValid2 = false;
        this.showSignValid3 = true;
        this.showSignValid4 = false;
      }

      if (this.cuentaIzq == 4) {
        this.showSignValid1 = false;
        this.showSignValid2 = false;
        this.showSignValid3 = false;
        this.showSignValid4 = true;
      }
      
      //console.log(JSON.stringify(this.responseCalidadHuella))

    });


  
}


validarCalidadHuellaDer() {

  let body = new RequestCalidadHuella();
  body.fingerPrint = this.img_huella_right_save;

    //console.log("body: " +  body.foto);

    //enviando  datos
    this.datosPersonaService.validar_calidad_huella(body).subscribe((resp: ResponseCalidadHuella) => {
      this.responseCalidadHuella = resp;


      if (this.responseCalidadHuella.quality == 1 || this.responseCalidadHuella.quality == 2 || this.responseCalidadHuella.quality == 3){
        this.cuentaDer = this.cuentaDer!  + 1;
        //this.showSignValid = true;
      }else{
        this.showSignError = true;
      }

      //alert(this.cuenta);

      if (this.cuentaDer == 1) {
        this.showSignValid5 = true;
        this.showSignValid6 = false;
        this.showSignValid7 = false;
        this.showSignValid8 = false;
      }

      if (this.cuentaDer == 2) {
        this.showSignValid5 = false;
        this.showSignValid6 = true;
        this.showSignValid7 = false;
        this.showSignValid8 = false;
      }

      if (this.cuentaDer == 3) {
        this.showSignValid5 = false;
        this.showSignValid6 = false;
        this.showSignValid7 = true;
        this.showSignValid8 = false;
      }

      if (this.cuentaDer == 4) {
        this.showSignValid5 = false;
        this.showSignValid6 = false;
        this.showSignValid7 = false;
        this.showSignValid8 = true;
      }
      
      //console.log(JSON.stringify(this.responseCalidadHuella))

    });


  
}


guardarPUI() {

  let body = new RequestDatosPersona();
  body.dui = this.dui;
  body.pu_i = this.img_huella_left_save_bd;
 //console.log("body: " +  body.foto);
 if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
    console.log("body" + body);

    //enviando  datos
    this.datosPersonaService.pulgar_izquierdo(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
      this.responseTmpDatosPersona = resp;
    });
  }

  
}




  
guardarPUD() {

  let body = new RequestDatosPersona();
  body.dui = this.dui;
  body.pu_d = this.img_huella_right_save_bd;
 //console.log("body: " +  body.foto);
 if (sessionStorage.getItem('dui') && sessionStorage.getItem('dui') != null) {
    console.log("body" + body);

    //enviando  datos
    this.datosPersonaService.pulgar_derecho(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
      this.responseTmpDatosPersona = resp;
    });
  }

  
}


guardar(){
  this.router.navigate(['/carnet-print']);
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
