import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './ingresar-gasto.component.html',
  styleUrl: './ingresar-gasto.component.css'
})
export class IngresarGastoComponent {
  nombreGasto: string = '';
  cantidad: number = 0;
  formularioIncorrecto: boolean = false;
  textIncorrecto: string = '';

  constructor(private _presupuestoService: PresupuestoService) { }

  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }


    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Nombre gasto o cantidad incorrecta';
    } else {

      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      // Enviamos el objeto a los suscriptores 
      this._presupuestoService.agregarGasto(GASTO);

      // Reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }

}
