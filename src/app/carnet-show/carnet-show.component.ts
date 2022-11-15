import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { ChatMessageDto } from '../_model/chatMessageDto';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { ResponseTmpDatosPersona } from '../_model/responseTmpDatosPersona';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { WebSocketService } from '../_service/web-socket.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-carnet-show',
  templateUrl: './carnet-show.component.html',
  styleUrls: ['./carnet-show.component.css']
})
export class CarnetShowComponent implements OnInit, OnDestroy {

  responseTmpDatosPersona?: ResponseTmpDatosPersona[];
  persona: any;
  foto?: string;
  firma?: string;
  dui?: HTMLInputElement;
  nombre?: string;
  ape_paterno?: string;
  ape_materno?: string;
  fecha_nacimiento?: string;
  lugar_nacimiento?: string;
  nacionalidad?: string;
  genero?: string;
  tipo_sangre?: string;
  expedida?: string;
  sign?: string;

  genero_full?: string;

  ruta?: string;

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;
  img_sign?: HTMLImageElement;

  tabActiveDatosPersonales?: string;
  tabActiveDatosFisicos?: string;
  tabActiveDatosDemograficos?: string;

  tabActiveDatosFotografia?: string;
  tabActiveDatosFirma?: string;
  tabActiveDatosHuella?: string;




  btn_guardar?: HTMLElement;
  btn_next?: HTMLElement;

  div_canva?: HTMLElement;
  div_sign?: HTMLElement;

  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg: string | undefined;


  txt_input_user?: HTMLInputElement;
  txt_input_message?: HTMLInputElement;
  

  imgSignature?: HTMLImageElement;

  continuar?: false;

  constructor(private datosPersonaService: DatosPersonaService, private router: Router, public webSocketService: WebSocketService) { }


  ngOnInit(): void {

    const top_nombre = document.getElementById('top_nombre') as HTMLDivElement | null;
    const txt_nombre = document.getElementById('txt_nombre') as HTMLInputElement | null;

    var garbage = top_nombre?.removeChild(txt_nombre!);


    this.ruta = "../../assets/images/fotos/foto.jpeg";

    this.webSocketService.openWebSocket();
    //this.webSocketService.openWebSocketClient();


    console.log(this.webSocketService.chatMessages);


    this.mostrarDatosPersonales();
    

    


    /*  this.foto = sessionStorage.getItem('foto')!;
      this.firma = sessionStorage.getItem('firma')!;

      this.dui = sessionStorage.getItem('dui')!;
      this.nombre = sessionStorage.getItem('nombre')?.toUpperCase()!;
      this.ape_paterno = sessionStorage.getItem('ape_paterno')?.toUpperCase()!;
      this.ape_materno = sessionStorage.getItem('ape_materno')?.toUpperCase()!;
      this.fecha_nacimiento = sessionStorage.getItem('fecha_nacimiento')!;
      this.lugar_nacimiento = sessionStorage.getItem('lugar_nacimiento')!;
      this.nacionalidad = sessionStorage.getItem('pais_nacimiento')!;

      this.genero = sessionStorage.getItem('genero')!;

      if (this.genero == 'MA') {
        this.genero_full = 'MASCULINO';
      }else{
        this.genero_full = 'FEMENINO';
      }

      this.tipo_sangre = sessionStorage.getItem('tipo_sangre')!;
      this.expedida = sessionStorage.getItem('fecha_emision_dui')!;

  */


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


  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }


  load_canva()
  {
    this.div_canva = document.getElementById("div_canva") as HTMLElement;
    this.div_sign= document.getElementById("div_sign") as HTMLElement;
    this.div_sign.hidden = true;
    this.div_canva.hidden = false;

    this.btn_guardar = document.getElementById("btn_guardar") as HTMLElement;
    this.btn_next= document.getElementById("btn_next") as HTMLElement;
    this.btn_guardar.hidden = false;
    this.btn_next.hidden = true;
  }


  clearPad() {
    this.signaturePad.clear();
    this.load_canva();
    this.btn_guardar = document.getElementById("btn_guardar") as HTMLElement;
    this.btn_next= document.getElementById("btn_next") as HTMLElement;
    this.btn_next.hidden = true;
    this.btn_guardar.hidden = false;

    this.imgSignature = document.getElementById("imgSignature") as HTMLImageElement;
    this.imgSignature.innerHTML = '';
  }

  
  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.dui = document.getElementById('txt_dui') as HTMLInputElement;

    //alert('dui= '+this.dui.value);


    //this.dui = "01924911-6";
    //const dui = this.dui.value;




    if (this.dui.value.toString() && this.dui.value.toString() != null)   {
      //console.log("body" + body);


      let body = new RequestDatosPersona();
      body.firma = base64Data;
      body.dui = this.dui.value.toString();
      console.log('Firma: '+base64Data);

      console.log('body dui= '+body.dui);
  


      $("#input-user").val("Firma2");   
      $("#input-message").val(body.firma);
      //$("#input-message").val('');
      $('#btn_send').click();


      //enviando  datos
      this.datosPersonaService.sign(body).subscribe((resp: ResponseTmpDatosPersona[]) => {
        this.responseTmpDatosPersona = resp;
      });


    }

    this.signatureImg = base64Data;
    //this.router.navigate(['/fingerprint']);



  }
  
  mostrarDatosPersonales(){
    this.tabActiveDatosPersonales = "active";
    this.tabActiveDatosFisicos = "inactive";
    this.tabActiveDatosDemograficos = "inactive";
    this.tabActiveDatosFotografia = "inactive";
    this.tabActiveDatosFirma = "inactive";
    this.tabActiveDatosHuella = "inactive";
  }

  mostrarDatosFisicos(){
    this.tabActiveDatosPersonales = "inactive";
    this.tabActiveDatosFisicos = "active";
    this.tabActiveDatosDemograficos = "inactive";
    this.tabActiveDatosFotografia = "inactive";
    this.tabActiveDatosFirma = "inactive";
    this.tabActiveDatosHuella = "inactive";
  }

  mostrarDatosDemograficos(){
    this.tabActiveDatosPersonales = "inactive";
    this.tabActiveDatosFisicos = "inactive";
    this.tabActiveDatosDemograficos = "active";
    this.tabActiveDatosFotografia = "inactive";
    this.tabActiveDatosFirma = "inactive";
    this.tabActiveDatosHuella = "inactive";
  }

  mostrarDatosFotografia(){
    this.tabActiveDatosPersonales = "inactive";
    this.tabActiveDatosFisicos = "inactive";
    this.tabActiveDatosDemograficos = "inactive";
    this.tabActiveDatosFotografia = "active";
    this.tabActiveDatosFirma = "inactive";
    this.tabActiveDatosHuella = "inactive";
  }

  mostrarDatosFirma(){
    this.tabActiveDatosPersonales = "inactive";
    this.tabActiveDatosFisicos = "inactive";
    this.tabActiveDatosDemograficos = "inactive";
    this.tabActiveDatosFotografia = "inactive";
    this.tabActiveDatosFirma = "active";
    this.tabActiveDatosHuella = "inactive";
  }
  

  mostrarDatosHuella(){
    this.tabActiveDatosPersonales = "inactive";
    this.tabActiveDatosFisicos = "inactive";
    this.tabActiveDatosDemograficos = "inactive";
    this.tabActiveDatosFotografia = "inactive";
    this.tabActiveDatosFirma = "inactive";
    this.tabActiveDatosHuella = "active";
  }
  

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    //alert('hola');
}


  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
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

firma_p() {
  if (sessionStorage.getItem('foto') && sessionStorage.getItem('foto') != '' && sessionStorage.getItem('foto') != 'null') {
    this.router.navigate(['/sign']);
  }
}

huella() {
  if (sessionStorage.getItem('firma') && sessionStorage.getItem('firma') != '' && sessionStorage.getItem('firma') != 'null') {
    this.router.navigate(['/fingerprint']);
  }
}






}
