import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaDistanciaComponent } from './pagina-distancia/pagina-distancia.component';
import { PaginaTiempoComponent } from './pagina-tiempo/pagina-tiempo.component';
import { PaginaVelocidadComponent } from './pagina-velocidad/pagina-velocidad.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalComponent },
  { path: 'principal', component: PaginaPrincipalComponent},
  { path: 'distancia', component: PaginaDistanciaComponent },
  { path: 'tiempo', component: PaginaTiempoComponent },
  { path: 'velocidad', component: PaginaVelocidadComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'pagina-distancia', component: PaginaDistanciaComponent },
  { path: 'pagina-velocidad', component: PaginaVelocidadComponent },
  { path: 'pagina-tiempo', component: PaginaTiempoComponent },
  { path: '', redirectTo: '/pagina-distancia', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/pagina-distancia' } // Ruta 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
