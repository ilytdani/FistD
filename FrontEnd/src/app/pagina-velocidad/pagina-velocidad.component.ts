import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-velocidad',
  templateUrl: './pagina-velocidad.component.html',
  styleUrls: ['./pagina-velocidad.component.css']
})
export class PaginaVelocidadComponent {
  // Modelo de datos para el cálculo seleccionado
  calculationType: string = 'finalVelocity'; // Valor por defecto

  // Variables para las entradas del usuario
  initialVelocity: number | null = null;
  finalVelocity: number | null = null;
  time: number | null = null;
  acceleration: number | null = null;
  distance: number | null = null;

  // Unidades seleccionadas para cada tipo de dato
  initialVelocityUnit: string = 'm/s';
  finalVelocityUnit: string = 'm/s';
  timeUnit: string = 'seconds';
  accelerationUnit: string = 'm/s²';
  distanceUnit: string = 'meters';

  // Resultado del cálculo
  result: string = '';
  animateResult: boolean = false;

  // Método para realizar el cálculo según la selección
  performCalculation(): void {
    this.animateResult = false; // Reinicia la animación del resultado
    let output = ''; // Variable para construir el mensaje del resultado

    // Conversión de las unidades de entrada
    const initialVelocityInMetersPerSecond = this.convertSpeedToMetersPerSecond(this.initialVelocity, this.initialVelocityUnit);
    const finalVelocityInMetersPerSecond = this.convertSpeedToMetersPerSecond(this.finalVelocity, this.finalVelocityUnit);
    const timeInSeconds = this.convertTimeToSeconds(this.time, this.timeUnit);
    const accelerationInMetersPerSecondSquared = this.convertAccelerationToMetersPerSecondSquared(this.acceleration, this.accelerationUnit);
    const distanceInMeters = this.convertDistanceToMeters(this.distance, this.distanceUnit);

    // Lógica para cada tipo de cálculo
    switch (this.calculationType) {
      case 'finalVelocity':
        if (initialVelocityInMetersPerSecond !== null && accelerationInMetersPerSecondSquared !== null && timeInSeconds !== null) {
          const calculatedFinalVelocity = initialVelocityInMetersPerSecond + accelerationInMetersPerSecondSquared * timeInSeconds;
          output = `La velocidad final es ${this.convertMetersPerSecondToSpeedUnit(calculatedFinalVelocity, this.finalVelocityUnit).toFixed(2)} ${this.finalVelocityUnit}.
          Para determinar este valor, se aplicó la fórmula:
          vf = vi + a × t
          Donde:
          •	vf: Velocidad final
          •	vi: Velocidad inicial (${initialVelocityInMetersPerSecond} m/s)
          •	a: Aceleración (${accelerationInMetersPerSecondSquared} m/s²)
          •	t: Tiempo (${timeInSeconds} segundos)
          El cálculo consiste en sumar la velocidad inicial (vi) al producto de la aceleración (a) y el tiempo (t).`;
          
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      case 'distance':
        if (initialVelocityInMetersPerSecond !== null && timeInSeconds !== null && accelerationInMetersPerSecondSquared !== null) {
          const calculatedDistance = initialVelocityInMetersPerSecond * timeInSeconds + 0.5 * accelerationInMetersPerSecondSquared * Math.pow(timeInSeconds, 2);
          output = `La distancia es ${this.convertMetersToDistanceUnit(calculatedDistance, this.distanceUnit).toFixed(2)} ${this.distanceUnit}.
para determinar este valor, se aplicó la fórmula:
        d = vi × t + 0.5 × a × t²
        Donde:
        •  vi: Velocidad inicial (${initialVelocityInMetersPerSecond} m/s)
        •  t: Tiempo (${timeInSeconds} segundos)
        •  a: Aceleración (${accelerationInMetersPerSecondSquared} m/s²)
El cálculo consiste en sumar el producto de la velocidad inicial (vi) y el tiempo (t) a la mitad del producto de la aceleración (a) y el cuadrado del tiempo (t).`;
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      case 'acceleration':
        if (initialVelocityInMetersPerSecond !== null && finalVelocityInMetersPerSecond !== null && timeInSeconds !== null) {
          const calculatedAcceleration = (finalVelocityInMetersPerSecond - initialVelocityInMetersPerSecond) / timeInSeconds;
          output = `La aceleración es ${this.convertMetersPerSecondSquaredToAccelerationUnit(calculatedAcceleration, this.accelerationUnit).toFixed(2)} ${this.accelerationUnit}.
Para determinar este valor, se aplicó la fórmula:
          a = (vf - vi) / t
          Donde:
          vf: Velocidad final (${finalVelocityInMetersPerSecond} m/s)
          vi: Velocidad inicial (${initialVelocityInMetersPerSecond} m/s)
          t: Tiempo (${timeInSeconds} segundos)
El cálculo consiste en restar la velocidad inicial (vi) de la velocidad final (vf) y dividir el resultado entre el tiempo (t).`;
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      case 'time':
        if (initialVelocityInMetersPerSecond !== null && finalVelocityInMetersPerSecond !== null && accelerationInMetersPerSecondSquared !== null) {
          const calculatedTime = (finalVelocityInMetersPerSecond - initialVelocityInMetersPerSecond) / accelerationInMetersPerSecondSquared;
          output = `El tiempo es ${this.convertSecondsToTimeUnit(calculatedTime, this.timeUnit).toFixed(2)} ${this.timeUnit}.
Para determinar este valor, se aplicó la fórmula:
          t = (vf - vi) / a
          Donde:
          vf: Velocidad final (${finalVelocityInMetersPerSecond} m/s)
          vi: Velocidad inicial (${initialVelocityInMetersPerSecond} m/s)
          a: Aceleración (${accelerationInMetersPerSecondSquared} m/s²)
El cálculo consiste en restar la velocidad inicial (vi) de la velocidad final (vf) y dividir el resultado entre la aceleración (a).`;
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      case 'initialVelocity':
        if (distanceInMeters !== null && timeInSeconds !== null && accelerationInMetersPerSecondSquared !== null) {
          const calculatedInitialVelocity = (distanceInMeters - 0.5 * accelerationInMetersPerSecondSquared * Math.pow(timeInSeconds, 2)) / timeInSeconds;
          output = `La velocidad inicial es ${this.convertMetersPerSecondToSpeedUnit(calculatedInitialVelocity, this.initialVelocityUnit).toFixed(2)} ${this.initialVelocityUnit}.
Para determinar este valor, se aplicó la fórmula:
          vi = (d - 0.5 × a × t²) / t
          Donde:
          •	d: Distancia (${distanceInMeters} metros)
          •	a: Aceleración (${accelerationInMetersPerSecondSquared} m/s²)
          •	t: Tiempo (${timeInSeconds} segundos)
El cálculo consiste en restar la mitad del producto de la aceleración (a) y el cuadrado del tiempo (t) a la distancia (d) y dividir el resultado entre el tiempo (t).`;
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      case 'finalVelocityByDistance':
        if (initialVelocityInMetersPerSecond !== null && accelerationInMetersPerSecondSquared !== null && distanceInMeters !== null) {
          const calculatedFinalVelocity = Math.sqrt(Math.pow(initialVelocityInMetersPerSecond, 2) + 2 * accelerationInMetersPerSecondSquared * distanceInMeters);
          output = `La velocidad final es ${this.convertMetersPerSecondToSpeedUnit(calculatedFinalVelocity, this.finalVelocityUnit).toFixed(2)} ${this.finalVelocityUnit}.
Para determinar este valor, se aplicó la fórmula:
          vf = √(vi² + 2 × a × d)
          Donde:
          •	vi: Velocidad inicial (${initialVelocityInMetersPerSecond} m/s)
          •	a: Aceleración (${accelerationInMetersPerSecondSquared} m/s²)
          •	d: Distancia (${distanceInMeters} metros)
El cálculo consiste en sumar el cuadrado de la velocidad inicial (vi) al doble del producto de la aceleración (a) y la distancia (d) y obtener la raíz cuadrada del resultado.`;
        } else {
          output = 'Por favor, ingresa todos los valores necesarios.';
        }
        break;

      default:
        output = 'Por favor, selecciona un cálculo válido.';
    }

    // Muestra el resultado con animación
    this.result = output;
    this.animateResult = true;
  }

  // Métodos para conversión de unidades
  private convertSpeedToMetersPerSecond(speed: number | null, unit: string): number | null {
    if (speed === null) return null;
    switch (unit) {
      case 'm/s': return speed;
      case 'km/h': return speed / 3.6;
      case 'mi/h': return speed * 0.44704;
      default: return speed;
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

  private convertAccelerationToMetersPerSecondSquared(acceleration: number | null, unit: string): number | null {
    if (acceleration === null) return null;
    return acceleration; // Solo se soporta m/s²
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

  private convertMetersPerSecondToSpeedUnit(speed: number, unit: string): number {
    switch (unit) {
      case 'm/s': return speed;
      case 'km/h': return speed * 3.6;
      case 'mi/h': return speed / 0.44704;
      default: return speed;
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

  private convertMetersToDistanceUnit(meters: number, unit: string): number {
    switch (unit) {
      case 'meters': return meters;
      case 'kilometers': return meters / 1000;
      case 'miles': return meters / 1609.34;
      default: return meters;
    }
  }

  private convertMetersPerSecondSquaredToAccelerationUnit(acceleration: number, unit: string): number {
    return acceleration; // Solo se soporta m/s²
  }
}
