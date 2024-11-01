import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PresupuestoService } from '../../services/presupuesto.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingresar-presupuesto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrl: './ingresar-presupuesto.component.css'
})
export class IngresarPresupuestoComponent {
  cantidad:number=0;
  cantidadError:boolean=false;

  constructor(private _presupuestoService:PresupuestoService, private _router: Router) { }
  agregar(){
    if(this.cantidad>0){
      this.cantidadError=false;
      this._presupuestoService.presupuesto=this.cantidad;
      this._presupuestoService.restante=this.cantidad;
      this._router.navigate(['/gastos']);
    }else{
      this.cantidadError=true;
    }
  }
}
