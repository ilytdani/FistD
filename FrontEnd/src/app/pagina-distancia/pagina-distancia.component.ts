import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-distancia',
  templateUrl: './pagina-distancia.component.html',
  styleUrls: ['./pagina-distancia.component.css']
})
export class PaginaDistanciaComponent {
  // Variables de entrada
  time: string = ''; // Tiempo en segundos
  speed: string = ''; // Velocidad en m/s
  result: string = ''; // Resultado de la distancia calculada
  animateResult: boolean = false; // Controla la animación del resultado

  constructor(private router: Router) {}

  // Método para calcular la distancia
  calculateDistance(): void {
    const timeValue = parseFloat(this.time); // Convertir tiempo a número
    const speedValue = parseFloat(this.speed); // Convertir velocidad a número

    // Validación de valores ingresados
    if (isNaN(timeValue) || isNaN(speedValue) || timeValue <= 0 || speedValue <= 0) {
      this.result = 'Por favor, ingresa valores válidos (positivos).';
      this.triggerAnimation(); // Reiniciar la animación para mostrar el mensaje
      return;
    }

    // Cálculo de la distancia
    const distance = timeValue * speedValue;

    // Generar explicación detallada del cálculo
    this.result = `
      Distancia calculada: ${distance.toFixed(2)} metros.
      Fórmula: distancia = velocidad × tiempo.
      Valores usados:
      - Tiempo: ${timeValue.toFixed(2)} segundos.
      - Velocidad: ${speedValue.toFixed(2)} metros/segundo.
    `.trim();

    this.triggerAnimation(); // Disparar la animación
  }

  // Método para reiniciar y disparar la animación del resultado
  triggerAnimation(): void {
    this.animateResult = false; // Reiniciar el estado de la animación
    setTimeout(() => {
      this.animateResult = true; // Aplicar la animación
    }, 0); // Asegurar el reflujo
  }

  // Método para regresar al dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']); // Navegar al dashboard
  }
}
