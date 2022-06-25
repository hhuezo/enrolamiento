import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { TimelineModule } from "primeng/timeline";
import { StepsModule } from 'primeng/steps';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { PhysicInformationComponent } from './physic-information/physic-information.component';
import { DemographicInformationComponent } from './demographic-information/demographic-information.component';
import { PhotographyComponent } from './photography/photography.component';
import { SignComponent } from './sign/sign.component';
import { FingerprintComponent } from './fingerprint/fingerprint.component';
import { WebcamModule } from 'ngx-webcam';
import { HeaderComponent } from './header/header.component';
import { CarnetPrintComponent } from './carnet-print/carnet-print.component';
import { OptionsComponent } from './options/options.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { BrowserAnimationsModule }    from "@angular/platform-browser/animations";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PersonalInformationComponent,
    PhysicInformationComponent,
    DemographicInformationComponent,
    PhotographyComponent,
    SignComponent,
    FingerprintComponent,
    HeaderComponent,
    CarnetPrintComponent,
    OptionsComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TimelineModule,
    StepsModule,
    WebcamModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
