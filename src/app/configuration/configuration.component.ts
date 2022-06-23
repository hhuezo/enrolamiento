import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsePaises } from '../_model/responsePaises';
import { ResponseTiposDocumento } from '../_model/responseTiposDocumento';
import { CatalogoService } from '../_service/catalogo.service';
import * as $ from 'jquery';
import { ConfiguracionService } from '../_service/configuracion.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  responsePaises?: ResponsePaises[];
  responsePais?: ResponsePaises[];
  responsePaisSeleccionado?: ResponsePaises[];

  responseTipoDocumento?: ResponseTiposDocumento[];
  responseTipoDocumentoSeleccionado?: ResponseTiposDocumento[];

  paises: ResponsePaises[] = [];

  responseTiposDocumento?: ResponseTiposDocumento[];
  tipos_documento: ResponseTiposDocumento[] = [];

  codigoPais?: number;
  codigoTipoDocumento?: number;

  txt_codigo_area?: HTMLInputElement;
  txt_codigo_pais?: HTMLInputElement;
  
  paiCodigo?: string;
  paiDescripcion?: string;
  paiAbreviacion?: string;
  paiCodArea?: string;
  paiImgBandera?: string;
  

  idTdoCodigo?: number;
  tdoCodigo?: string;
  tdoDescripcion?: string;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private catalogoService: CatalogoService,
    private configuracionService: ConfiguracionService
  ) { }


  ngOnInit(): void {

    this.submitted = true;

    this.form = this.formBuilder.group(
      {
        cbo_pais_documento: ['', Validators.required],
        cbo_tipo_documento: ['', Validators.required],
        txt_codigo_area: ['', Validators.required],       
        txt_codigo_pais:  ['', Validators.required],       
      }

    );
    
    this.catalogoService.getPaises().subscribe((resp: ResponsePaises[]) => { this.responsePaises = resp;
      console.log('response paises: ', this.responsePaises);

      this.paises = this.responsePaises;




    });

    
    this.catalogoService.getTiposDocumento().subscribe((resp: ResponseTiposDocumento[]) => { this.responseTiposDocumento = resp;
      console.log('response tipos_documento: ', this.responseTiposDocumento);

      this.tipos_documento = this.responseTiposDocumento;

    });

  }


  
  onChangePais(paisSeleccionado: string){



    this.catalogoService.getPais(paisSeleccionado).subscribe((resp: ResponsePaises[]) => { this.responsePais = resp;
      console.log('response pais seleccionado: ', this.responsePais);

      this.responsePaisSeleccionado = this.responsePais;


      console.log('this.responsePaisSeleccionado'+this.responsePaisSeleccionado);


      this.txt_codigo_area = document.getElementById("txt_codigo_area") as HTMLInputElement;
      this.txt_codigo_pais = document.getElementById("txt_codigo_pais") as HTMLInputElement;
  
      this.txt_codigo_area.value = this.responsePaisSeleccionado[0].pai_cod_area!;
      this.txt_codigo_pais.value = this.responsePaisSeleccionado[0].pai_codigo!;


      this.paiCodigo = this.responsePaisSeleccionado[0].pai_codigo;
      this.paiDescripcion = this.responsePaisSeleccionado[0].pai_descripcion;
      this.paiAbreviacion = this.responsePaisSeleccionado[0].pai_abreviacion;
      this.paiCodArea = this.responsePaisSeleccionado[0].pai_cod_area;
      this.paiImgBandera = this.responsePaisSeleccionado[0].pai_img_bandera;



    });




      //alert('pais seleccionado: '+paisSeleccionado);
      //this.txt_codigo_area.value = this.paiCodArea!;
      console.log('paisSeleccionado onChange= '+paisSeleccionado);
      //alert('paisSeleccionado onChange= '+paisSeleccionado);
      
      //$("txt_codigo_area").val("Glenn Quagmire");


  }


  onChangeTipoDocumento(codigoTipoDocumento: string){
    //alert('cambio de tipo de documento: '+codigoTipoDocumento);

    this.catalogoService.getTipoDocumento(codigoTipoDocumento).subscribe((resp: ResponseTiposDocumento[]) => { this.responseTipoDocumento = resp;
      console.log('response tipo documento seleccionado: ', this.responseTipoDocumento);

      this.responseTipoDocumentoSeleccionado = this.responseTipoDocumento;


      console.log('this.responseTipoDocumentoSeleccionado'+this.responseTipoDocumentoSeleccionado);


      this.idTdoCodigo = this.responseTipoDocumentoSeleccionado[0].id;
      this.tdoCodigo = this.responseTipoDocumentoSeleccionado[0].tdo_codigo;
      this.tdoDescripcion = this.responseTipoDocumentoSeleccionado[0].tdo_descripcion;

    });


  }



  back(){
    this.router.navigate(['/login']);
  }

  guardar(){
    
    
    this.codigoPais = this.form.controls['cbo_pais_documento'].value;
    this.codigoTipoDocumento = this.form.controls['cbo_tipo_documento'].value;

    console.log('codigoPais= '+this.codigoPais);
    console.log('codigoTipoDocumento= '+this.codigoTipoDocumento);


    console.log('this.paiCodigo= '+this.paiCodigo);
    console.log('this.paiDescripcion= '+this.paiDescripcion);
    console.log('this.paiAbreviacion= '+this.paiAbreviacion);
    console.log('this.paiCodArea= '+this.paiCodArea);
    console.log('this.paiImgBandera= '+this.paiImgBandera);

    
    console.log('this.idTdoCodigo= '+this.idTdoCodigo);
    console.log('this.tdoCodigo= '+this.tdoCodigo);
    console.log('this.tdoDescripcion= '+this.tdoDescripcion);
    




    this.router.navigate(['/home']);
  }

}
