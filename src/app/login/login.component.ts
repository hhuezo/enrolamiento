import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequestLogin } from '../_model/requestLogin';
import { ResponseLogin } from '../_model/responseLogin';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form?: FormGroup ;
  submitted = false;
  
  usuario?: string;
  password: any;

  responselogin?: ResponseLogin;
  msjerr?: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    sessionStorage.clear();
    localStorage.clear();

    this.form = this.formBuilder.group(
      {
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }



  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }


  onSubmit(): void { //content
    this.submitted = true;

    if (this.form!.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form!.value, null, 2));

    if (this.form!.valid) {
      console.log("Form Submitted!");


  
      this.usuario = this.form!.controls['usuario'].value;
      this.password = this.form!.controls['password'].value;
      // this.encodedpw = btoa(this.password);



      let body = new RequestLogin();
      // body.documento = this.usuario;
      // body.password = this.encodedpw;
      body.user_name = this.usuario;
      body.password = this.password;

      console.log("bodyLogin: ", body);

      // this.serviceLogin = 
      this.loginService.login(body).subscribe((resp: ResponseLogin) => { this.responselogin = resp;
      console.log('response: ', this.responselogin);

        if (this.responselogin.val === '0') {

            // this.nombre = this.responselogin.nombre;
            // this.codtipo = this.responselogin.cod_tipo_persona;
            // this.tipopersona = this.responselogin.tipo_persona;

            // this.codigo_pais = this.responselogin.codigo_pais;

            // // this.cookieService.set('nombre', this.nombre);
            // localStorage.setItem('nombre', this.nombre);
            // // this.cookieService.set('codtipo', this.codtipo);
            // localStorage.setItem('codtipo', this.codtipo);
            // // this.cookieService.set('tipoper', this.tipopersona);
            // localStorage.setItem('tipoper', this.tipopersona);
            // // this.cookieService.set('doc', this.documento);
            // localStorage.setItem('doc', this.documento);

            // localStorage.setItem('codigo_pais', this.codigo_pais);

            // this.router.navigate(['/home']);
            this.router.navigate(['/home']);
            
        } else if (this.responselogin.val === '1') {
            this.msjerr = this.responselogin.mensaje;

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
          this.msjerr = this.responselogin.mensaje;

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

  }

  recuperaPass(){
    console.log('Recuperar clave');
  }
  

}
