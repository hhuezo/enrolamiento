import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {



  events2?: any[];
  estado:any;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.events2 = [
      "2020", "2021", "2022", "2023"
    ];

  }


  datos_personales() {
    sessionStorage.setItem('dui', '');
    sessionStorage.setItem('nombre', '');
    sessionStorage.setItem('anteojos', '');
    sessionStorage.setItem('fecha_nacimiento', '');
    sessionStorage.setItem('foto', '');
    sessionStorage.setItem('firma', '');
    sessionStorage.setItem('huella', '');
    this.router.navigate(['/personal-information']);
  }

  datos_fisicos() {
    this.router.navigate(['/physic-information']);
  }

  datos_demograficos() {
    this.router.navigate(['/demographic-information']);
  }

  fotografia() {
    this.router.navigate(['/photography']);
  }

  firma() {
    this.router.navigate(['/sign']);
  }

  huella() {
    this.router.navigate(['/fingerprint']);
  }

  webScoket(){
    this.router.navigate(['/carnet-show']);
  }

}
