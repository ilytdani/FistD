import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentDescription: string | null = null;

  constructor(private router: Router) {}

  showDescription(description: string): void {
    this.currentDescription = description;
  }

  hideDescription(): void {
    this.currentDescription = null;
  }

  descendAndNavigate(route: string): void {
    const cards = document.querySelectorAll('.custom-card');
    const container = document.querySelector('.container-fluid');

    if (cards.length > 0) {
      cards.forEach((card) => card.classList.add('cards-descending'));
      setTimeout(() => {
        if (container) {
          container.classList.add('container-descending');
          setTimeout(() => {
            this.router.navigate([route]);
          }, 500);
        }
      }, 500);
    } else {
      this.router.navigate([route]);
    }
  }
}
