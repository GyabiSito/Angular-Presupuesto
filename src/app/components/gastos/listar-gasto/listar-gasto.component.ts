import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-listar-gasto',
  standalone: true,
  imports: [NgClass],
  templateUrl: './listar-gasto.component.html',
  styleUrl: './listar-gasto.component.css'
})
export class ListarGastoComponent implements OnDestroy, OnInit {
  presupuesto:number=0;
  restante:number=0;
  listGastos:any[]=[];
  subscription: Subscription;


  constructor(private _presupuestoService: PresupuestoService) {
    this.subscription = this._presupuestoService.getGastos().subscribe(data => {
      this.restante=this.restante-data.cantidad;
      this.listGastos.push(data);
    })
  }
  ngOnInit():void{
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante() {
    if(this.presupuesto/4 > this.restante){
      return 'alert alert-danger';
    }else if(this.presupuesto/2 > this.restante){
      return 'alert alert-warning';
    }else{
      return 'alert alert-secondary';
    }
  }
}
