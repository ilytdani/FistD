import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  descendAndNavigate(route: string) {
    const cards = document.querySelectorAll('.custom-card'); // Selecciona las tarjetas
    const container = document.querySelector('.container-fluid'); // Selecciona el contenedor principal

    // Anima primero los cards
    cards.forEach((card) => card.classList.add('cards-descending'));

    // Espera a que termine la animación de los cards y luego anima el resto del contenedor
    setTimeout(() => {
      if (container) {
        container.classList.add('container-descending');
        setTimeout(() => {
          this.router.navigate([route]); // Navega después de la animación del contenedor
        }, 500); // Tiempo de la animación del contenedor
      }
    }, 500); // Tiempo de la animación de los cards
  }
}
