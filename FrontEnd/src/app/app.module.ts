import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaDistanciaComponent } from './pagina-distancia/pagina-distancia.component';
import { PaginaTiempoComponent } from './pagina-tiempo/pagina-tiempo.component';
import { PaginaVelocidadComponent } from './pagina-velocidad/pagina-velocidad.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PaginaDistanciaComponent,
    PaginaTiempoComponent,
    PaginaVelocidadComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
