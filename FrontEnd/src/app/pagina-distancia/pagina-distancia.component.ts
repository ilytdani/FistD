import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-distancia',
  templateUrl: './pagina-distancia.component.html',
  styleUrls: ['./pagina-distancia.component.css']
})
export class PaginaDistanciaComponent {
  // Variables de entrada
  time: number | null = null;
  speed: number | null = null;
  distance: number | null = null;

  // Selecciones del usuario
  calculationType: string = 'distance'; // Tipo de cálculo
  timeUnit: string = 'seconds'; // Unidad de tiempo
  speedUnit: string = 'm/s'; // Unidad de velocidad
  distanceUnit: string = 'meters'; // Unidad de distancia

  // Resultado y animación
  result: string = '';
  animateResult: boolean = false;

  // Realizar cálculo basado en selección
  performCalculation(): void {
    this.animateResult = false;
    let output = '';

    // Conversión de unidades
    const timeInSeconds = this.convertTimeToSeconds(this.time, this.timeUnit);
    const speedInMetersPerSecond = this.convertSpeedToMetersPerSecond(this.speed, this.speedUnit);
    const distanceInMeters = this.convertDistanceToMeters(this.distance, this.distanceUnit);

    // Lógica del cálculo
    switch (this.calculationType) {
      case 'distance':
        if (timeInSeconds !== null && speedInMetersPerSecond !== null) {
          const calculatedDistance = timeInSeconds * speedInMetersPerSecond;
          output = `La distancia es ${this.convertMetersToDistanceUnit(calculatedDistance, this.distanceUnit).toFixed(2)} ${this.distanceUnit}.\n`;
          output += `Se calculó multiplicando el tiempo (${timeInSeconds}s) por la velocidad (${speedInMetersPerSecond}m/s).`;
        } else {
          output = 'Por favor, ingresa tiempo y velocidad.';
        }
        break;

      case 'speed':
        if (timeInSeconds !== null && distanceInMeters !== null) {
          const calculatedSpeed = distanceInMeters / timeInSeconds;
          output = `La velocidad es ${this.convertMetersPerSecondToSpeedUnit(calculatedSpeed, this.speedUnit).toFixed(2)} ${this.speedUnit}.\n`;
          output += `Se calculó dividiendo la distancia (${distanceInMeters}m) por el tiempo (${timeInSeconds}s).`;
        } else {
          output = 'Por favor, ingresa distancia y tiempo.';
        }
        break;

      case 'time':
        if (speedInMetersPerSecond !== null && distanceInMeters !== null) {
          const calculatedTime = distanceInMeters / speedInMetersPerSecond;
          output = `El tiempo es ${this.convertSecondsToTimeUnit(calculatedTime, this.timeUnit).toFixed(2)} ${this.timeUnit}.\n`;
          output += `Se calculó dividiendo la distancia (${distanceInMeters}m) por la velocidad (${speedInMetersPerSecond}m/s).`;
        } else {
          output = 'Por favor, ingresa distancia y velocidad.';
        }
        break;

      default:
        output = 'Selecciona un tipo de cálculo.';
    }

    this.result = output;
    this.animateResult = true; // Activar animación
  }

  // Conversión de tiempo a segundos
  private convertTimeToSeconds(time: number | null, unit: string): number | null {
    if (time === null) return null;
    switch (unit) {
      case 'seconds': return time;
      case 'minutes': return time * 60;
      case 'hours': return time * 3600;
      default: return null;
    }
  }

  // Conversión de velocidad a metros por segundo
  private convertSpeedToMetersPerSecond(speed: number | null, unit: string): number | null {
    if (speed === null) return null;
    switch (unit) {
      case 'm/s': return speed;
      case 'km/h': return speed / 3.6;
      case 'mi/h': return speed * 0.44704;
      default: return null;
    }
  }

  // Conversión de distancia a metros
  private convertDistanceToMeters(distance: number | null, unit: string): number | null {
    if (distance === null) return null;
    switch (unit) {
      case 'meters': return distance;
      case 'kilometers': return distance * 1000;
      case 'miles': return distance * 1609.34;
      default: return null;
    }
  }

  // Conversiones inversas para mostrar resultados
  private convertMetersToDistanceUnit(meters: number, unit: string): number {
    switch (unit) {
      case 'meters': return meters;
      case 'kilometers': return meters / 1000;
      case 'miles': return meters / 1609.34;
      default: return meters;
    }
  }

  private convertSecondsToTimeUnit(seconds: number, unit: string): number {
    switch (unit) {
      case 'seconds': return seconds;
      case 'minutes': return seconds / 60;
      case 'hours': return seconds / 3600;
      default: return seconds;
    }
  }

  private convertMetersPerSecondToSpeedUnit(speed: number, unit: string): number {
    switch (unit) {
      case 'm/s': return speed;
      case 'km/h': return speed * 3.6;
      case 'mi/h': return speed / 0.44704;
      default: return speed;
    }
  }
}
