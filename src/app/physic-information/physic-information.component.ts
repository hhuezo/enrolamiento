import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physic-information',
  templateUrl: './physic-information.component.html',
  styleUrls: ['./physic-information.component.css']
})
export class PhysicInformationComponent implements OnInit {

  form!:FormGroup;
  submitted = false;




//datos fisicos
  anteojos!: string;
  colores_pieles!: string;
  tipos_bocas!: string;
  peso_lb!: string;
  lentes_contacto!: string;
  colores_ojos!: string;
  tipos_narices!: string;
  senales_especiales!: string;
  audifonos!: string;
  colores_cabellos!: string;
  estatura!: string;
  tipo_sangre!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.submitted = true;

    // if (this.form!.invalid) {
    //   return;
    // }

    // sessionStorage.clear();
    // localStorage.clear();

    this.form = this.formBuilder.group(
      {
        txt_anteojos: ['', Validators.required],
        cbo_tipos_narices: ['', Validators.required],
        cbo_colores_pieles: ['', Validators.required],
        txt_senales_especiales: ['', Validators.required],
        cbo_tipos_bocas: ['', Validators.required],
        txt_audifonos: ['', Validators.required],
        txt_peso_libras: ['', Validators.required],
        cbo_colores_cabellos: ['', Validators.required],
        txt_lentes_contacto: ['', Validators.required],
        txt_estatura: ['', Validators.required],
        cbo_colores_ojos: ['', Validators.required],
        cbo_tipo_sangre: ['', Validators.required],
      }
      
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  back(){
    this.router.navigate(['/home']);
  }

  guardar(){
    this.anteojos = this.form.controls['txt_anteojos'].value;
    this.tipos_narices = this.form.controls['cbo_tipos_narices'].value;
    this.colores_pieles = this.form.controls['cbo_colores_pieles'].value;
    this.senales_especiales = this.form.controls['txt_senales_especiales'].value;
    this.tipos_bocas = this.form.controls['cbo_tipos_bocas'].value;
    this.audifonos = this.form.controls['txt_audifonos'].value;
    this.peso_lb = this.form.controls['txt_peso_libras'].value;
    this.colores_cabellos = this.form.controls['cbo_colores_cabellos'].value;
    this.lentes_contacto = this.form.controls['txt_lentes_contacto'].value;
    this.estatura = this.form.controls['txt_estatura'].value;
    this.colores_ojos = this.form.controls['cbo_colores_ojos'].value;
    this.tipo_sangre = this.form.controls['cbo_tipo_sangre'].value;

    console.log("anteojos: "+ this.anteojos);
    console.log("nariz: "+ this.tipos_narices);
    console.log("piel: "+ this.colores_pieles);
    console.log("senales_especiales: "+ this.senales_especiales);
    console.log("boca: "+ this.tipos_bocas);
    console.log("audifonos: "+ this.audifonos);
    console.log("peso_libras: "+ this.peso_lb);
    console.log("cabello: "+ this.colores_cabellos);
    console.log("lentes_contacto: "+ this.lentes_contacto);
    console.log("ojos: "+ this.colores_ojos);
    console.log("estatura: "+ this.estatura);
    console.log("tipo_sangre: "+ this.tipo_sangre);


    sessionStorage.setItem('anteojos', this.anteojos);
    sessionStorage.setItem('nariz', this.tipos_narices);
    sessionStorage.setItem('piel', this.colores_pieles);
    sessionStorage.setItem('senales_especiales', this.senales_especiales);
    sessionStorage.setItem('boca', this.tipos_bocas);
    sessionStorage.setItem('audifonos', this.audifonos);
    sessionStorage.setItem('peso_libras', this.peso_lb);
    sessionStorage.setItem('cabello', this.colores_cabellos);
    sessionStorage.setItem('lentes_contacto', this.lentes_contacto);
    sessionStorage.setItem('ojos', this.colores_ojos);
    sessionStorage.setItem('estatura', this.estatura);
    sessionStorage.setItem('tipo_sangre', this.tipo_sangre);

 

    this.router.navigate(['/demographic-information']);
    

  }

}
