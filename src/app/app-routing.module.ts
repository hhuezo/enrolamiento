import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarnetPrintComponent } from './carnet-print/carnet-print.component';
import { DemographicInformationComponent } from './demographic-information/demographic-information.component';
import { FingerprintComponent } from './fingerprint/fingerprint.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PhotographyComponent } from './photography/photography.component';
import { PhysicInformationComponent } from './physic-information/physic-information.component';
import { SignComponent } from './sign/sign.component';
import { OptionsComponent } from './options/options.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ChatComponent } from './chat/chat.component';
<<<<<<< HEAD
import { CarnetShowComponent } from './carnet-show/carnet-show.component';
import { Sign1Component } from './sign1/sign1.component';
import { Photography2Component } from './photography2/photography2.component';
=======
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567

/* se declaran las rutas de los componentes */
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'personal-information', component: PersonalInformationComponent },
  { path: 'physic-information', component: PhysicInformationComponent },
  { path: 'demographic-information', component: DemographicInformationComponent },
  { path: 'photography', component: PhotographyComponent },
  { path: 'photography2', component: Photography2Component },
  { path: 'sign', component: SignComponent },
  { path: 'sign1', component: Sign1Component },
  { path: 'fingerprint', component: FingerprintComponent },
  { path: 'carnet-print', component: CarnetPrintComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
<<<<<<< HEAD
  { path: 'carnet-show', component: CarnetShowComponent },
=======
>>>>>>> 03180eba913de986976c13b8ed80925eb06fe567
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
