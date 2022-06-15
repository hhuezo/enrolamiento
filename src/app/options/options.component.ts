import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  datos_personales() {
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

}
