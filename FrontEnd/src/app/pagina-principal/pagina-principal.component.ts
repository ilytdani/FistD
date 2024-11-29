import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  constructor(private router: Router) {}

  descendCardAndNavigate() {
    const card = document.getElementById('card');
    if (card) {
      card.classList.add('descending');
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 500); // Tiempo igual a la duración de la animación de descenso
    }
  }
}
