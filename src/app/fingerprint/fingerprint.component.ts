import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

  constructor() { }

  //icons options
  img_physic_information?: HTMLImageElement;
  img_personal_information?: HTMLImageElement;
  img_demographic_information?: HTMLImageElement;
  img_photography?: HTMLImageElement;
  img_sign?: HTMLImageElement;
  img_fingerprint?: HTMLImageElement;

  ngOnInit(): void {
    this.load_icons();
  }




  load_icons() {
    
    this.img_personal_information = document.getElementById("img_personal_information") as HTMLImageElement;
    this.img_personal_information.src = "../../assets/images/datos_personales_blue.svg";

    this.img_physic_information = document.getElementById("img_physic_information") as HTMLImageElement;
    this.img_physic_information.src = "../../assets/images/datos_fisicos_blue.svg";

    this.img_demographic_information = document.getElementById("img_demographic_information") as HTMLImageElement;
    this.img_demographic_information.src = "../../assets/images/datos_demograficos_blue.svg";

    this.img_photography = document.getElementById("img_photography") as HTMLImageElement;
    this.img_photography.src = "../../assets/images/datos_foto_blue.svg";

    this.img_sign = document.getElementById("img_sign") as HTMLImageElement;
    this.img_sign.src = "../../assets/images/firma_blue.svg";

    this.img_fingerprint = document.getElementById("img_fingerprint") as HTMLImageElement;
    this.img_fingerprint.src = "../../assets/images/huella_digital_blue.svg";
    
  }

}
