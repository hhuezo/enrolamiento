import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsePaises } from '../_model/responsePaises';
import { ResponseTiposDocumento } from '../_model/responseTiposDocumento';
import { CatalogoService } from '../_service/catalogo.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  responsePaises?: ResponsePaises[];
  paises: ResponsePaises[] = [];

  responseTiposDocumento?: ResponseTiposDocumento[];
  tipos_documento: ResponseTiposDocumento[] = [];

  codigoPais?: number;
  codigoTipoDocumento?: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private catalogoService: CatalogoService
  ) { }


  ngOnInit(): void {

    this.submitted = true;

    this.form = this.formBuilder.group(
      {
        cbo_pais_documento: ['', Validators.required],
        cbo_tipo_documento: ['', Validators.required],
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


  back(){
    this.router.navigate(['/login']);
  }

  guardar(){
    
    
    this.codigoPais = this.form.controls['cbo_pais_documento'].value;
    this.codigoTipoDocumento = this.form.controls['cbo_tipo_documento'].value;

    console.log('codigoPais= '+this.codigoPais);
    console.log('codigoTipoDocumento= '+this.codigoTipoDocumento);

    this.router.navigate(['/home']);
  }

}
