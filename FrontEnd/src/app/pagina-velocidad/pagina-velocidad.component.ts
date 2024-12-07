import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-velocidad',
  templateUrl: './pagina-velocidad.component.html',
  styleUrls: ['./pagina-velocidad.component.css']
})
export class PaginaVelocidadComponent {

  // Variables de entrada
  initialVelocity: number | null = null;
  finalVelocity: number | null = null;
  acceleration: number | null = null;
  distance: number | null = null;
  time: number | null = null;

  // Unidades seleccionadas
  initialVelocityUnit: string = 'm/s';
  finalVelocityUnit: string = 'm/s';
  accelerationUnit: string = 'm/s²';
  distanceUnit: string = 'meters';
  timeUnit: string = 'seconds';

  // Selección de cálculo
  calculationType: string = 'finalVelocity';

  // Resultado y animación
  result: string = '';
  animateResult: boolean = false;

  // Lógica de cálculo
  performCalculation(): void {
    this.animateResult = false;
    let output = '';

    // Conversión de unidades
    const initialVelocity = this.convertVelocityToMetersPerSecond(this.initialVelocity, this.initialVelocityUnit);
    const finalVelocity = this.convertVelocityToMetersPerSecond(this.finalVelocity, this.finalVelocityUnit);
    const timeInSeconds = this.convertTimeToSeconds(this.time, this.timeUnit);
    const distanceInMeters = this.convertDistanceToMeters(this.distance, this.distanceUnit);

    switch (this.calculationType) {
      case 'finalVelocity':
        if (initialVelocity !== null && this.acceleration !== null && timeInSeconds !== null) {
          const finalVelocity = initialVelocity + this.acceleration * timeInSeconds;
          output = `La velocidad final es ${finalVelocity.toFixed(2)} m/s.\nFórmula: v_f = v_i + a * t.`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      case 'distance':
        if (initialVelocity !== null && this.acceleration !== null && timeInSeconds !== null) {
          const distance = initialVelocity * timeInSeconds + 0.5 * this.acceleration * Math.pow(timeInSeconds, 2);
          output = `La distancia es ${distance.toFixed(2)} metros.\nFórmula: x = v_i * t + 0.5 * a * t².`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      case 'acceleration':
        if (finalVelocity !== null && initialVelocity !== null && timeInSeconds !== null) {
          const acceleration = (finalVelocity - initialVelocity) / timeInSeconds;
          output = `La aceleración es ${acceleration.toFixed(2)} m/s².\nFórmula: a = (v_f - v_i) / t.`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      case 'time':
        if (finalVelocity !== null && initialVelocity !== null && this.acceleration !== null) {
          const time = (finalVelocity - initialVelocity) / this.acceleration;
          output = `El tiempo es ${time.toFixed(2)} segundos.\nFórmula: t = (v_f - v_i) / a.`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      case 'initialVelocity':
        if (distanceInMeters !== null && this.acceleration !== null && timeInSeconds !== null) {
          const initialVelocity = (distanceInMeters - 0.5 * this.acceleration * Math.pow(timeInSeconds, 2)) / timeInSeconds;
          output = `La velocidad inicial es ${initialVelocity.toFixed(2)} m/s.\nFórmula: v_i = (x - 0.5 * a * t²) / t.`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      case 'finalVelocityByDistance':
        if (initialVelocity !== null && this.acceleration !== null && distanceInMeters !== null) {
          const finalVelocity = Math.sqrt(Math.pow(initialVelocity, 2) + 2 * this.acceleration * distanceInMeters);
          output = `La velocidad final es ${finalVelocity.toFixed(2)} m/s.\nFórmula: v_f² = v_i² + 2 * a * x.`;
        } else {
          output = 'Por favor, ingresa todos los datos necesarios.';
        }
        break;

      default:
        output = 'Selecciona un tipo de cálculo válido.';
    }

    this.result = output;
    this.animateResult = true;
  }

  private convertVelocityToMetersPerSecond(velocity: number | null, unit: string): number | null {
    if (velocity === null) return null;
    switch (unit) {
      case 'm/s': return velocity;
      case 'km/h': return velocity / 3.6;
      case 'mi/h': return velocity * 0.44704;
      default: return velocity;
    }
  }

  private convertDistanceToMeters(distance: number | null, unit: string): number | null {
    if (distance === null) return null;
    switch (unit) {
      case 'meters': return distance;
      case 'kilometers': return distance * 1000;
      case 'miles': return distance * 1609.34;
      default: return distance;
    }
  }

  private convertTimeToSeconds(time: number | null, unit: string): number | null {
    if (time === null) return null;
    switch (unit) {
      case 'seconds': return time;
      case 'minutes': return time * 60;
      case 'hours': return time * 3600;
      default: return time;
    }
  }
}
