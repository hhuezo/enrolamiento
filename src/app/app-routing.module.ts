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

/* se declaran las rutas de los componentes */
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'personal-information', component: PersonalInformationComponent },
  { path: 'physic-information', component: PhysicInformationComponent },
  { path: 'demographic-information', component: DemographicInformationComponent },
  { path: 'photography', component: PhotographyComponent },
  { path: 'sign', component: SignComponent },
  { path: 'fingerprint', component: FingerprintComponent },
  { path: 'carnet-print', component: CarnetPrintComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
