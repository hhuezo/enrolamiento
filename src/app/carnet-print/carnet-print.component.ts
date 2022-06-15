import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carnet-print',
  templateUrl: './carnet-print.component.html',
  styleUrls: ['./carnet-print.component.css']
})
export class CarnetPrintComponent implements OnInit {

  foto?: string;
  firma?: string;
  dui?: string;
  nombre?: string;
  ape_paterno?: string;
  ape_materno?: string;
  fecha_nacimiento?: string;
  lugar_nacimiento?: string;
  nacionalidad?: string;
  genero?: string;
  tipo_sangre?: string;
  expedida?: string;
  
  genero_full?: string;

  constructor() { }

  ngOnInit(): void {

    this.foto = sessionStorage.getItem('foto')!;
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




  }

}
