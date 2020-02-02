import { NgModule,NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule, MatBadgeModule,MatCheckboxModule,MatCardModule,MatIconModule,MatSlideToggleModule,MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, EventService } from './_services';
import { HomeComponent } from './home';
import { AdmindashComponent } from './admindash';
import { SliderComponent } from './slider';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CreateComponent } from './create';
import { FooterComponent } from './footer';
import { BannerComponent } from './banner';
import { PanelComponent } from './panel';
import { SubmitComponent } from './submit';
import { DashboardComponent } from './dashboard';
import { EventsComponent } from './events';
import { AllComponent } from './all';
import { RequestsComponent } from './requests';
import { NavbarComponent } from './navbar';
import { ParticlesModule } from 'angular-particle';
import { RequestService } from './_services/request.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        FlexLayoutModule,
        MatButtonModule, MatCheckboxModule,MatCardModule,MatIconModule,WavesModule, ButtonsModule, IconsModule,
        MatExpansionModule,MatSlideToggleModule,MatBadgeModule,
        MatToolbarModule, MatSidenavModule, MatListModule,
        MatTabsModule,
        BrowserAnimationsModule,
        ParticlesModule,
        MDBBootstrapModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        SliderComponent,
        BannerComponent,
        LoginComponent,
        AdmindashComponent,
        RegisterComponent,
        CreateComponent,
        NavbarComponent,
        EventsComponent,
        AllComponent,
        FooterComponent,
        RequestsComponent,
        SubmitComponent,
        PanelComponent,
        DashboardComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        EventService,
        RequestService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }