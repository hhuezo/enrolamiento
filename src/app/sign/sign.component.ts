import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import Swal from 'sweetalert2';
import { RequestDatosPersona } from '../_model/requestDatosPersona';
import { RequestFirma } from '../_model/requestFirma';
import { ResponseDatosPersona } from '../_model/responseDatosPersona';
import { ResponseFirma } from '../_model/responseFirma';
import { DatosPersonaService } from '../_service/datos-persona.service';
import { FirmaService } from '../_service/firma.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg: string | undefined;


  responseFirma?: ResponseFirma;
  msjerr?: string;

  responseDatosPersona?: ResponseDatosPersona;


  constructor(
    private firmaService: FirmaService,
    private router: Router,
    private datosPersonaService: DatosPersonaService,
  ) { }

  ngOnInit(): void {
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
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();



    let body = new RequestFirma();
    // body.documento = this.usuario;
    // body.password = this.encodedpw;
    body.idPersona = '2';
    body.firma = base64Data;

    console.log("bodyFirma: ", body);

    // this.serviceLogin = 
    this.firmaService.guardarFirma(body).subscribe((resp: ResponseFirma) => { this.responseFirma = resp;
    console.log('response: ', this.responseFirma);

      if (this.responseFirma.val === '0') {

        //aqui guardo los datos de la persona temporalmente, esperando a que se termine el servicio de huella digital
        let body = new RequestDatosPersona();


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


        this.datosPersonaService.guardarPersona(body).subscribe((resp: ResponseDatosPersona) => { this.responseDatosPersona = resp;
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

            sessionStorage.setItem('firma',body.firma!);
            this.router.navigate(['/carnet-print']);
            //this.router.navigate(['/fingerprint']);
          }else{
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


    });


    console.log(base64Data);
    this.signatureImg = base64Data;
  }


}
