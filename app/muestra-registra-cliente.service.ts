import { Injectable,Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuestraRegistraClienteService {

  public mostrar_nuevo_registro:boolean;
  @Output() change:EventEmitter<boolean>=new EventEmitter();


  constructor() { }

  fn_nuevo_registro(mostrar_nuevo_registro:boolean)
  {
    this.mostrar_nuevo_registro=mostrar_nuevo_registro;
    this.change.emit(this.mostrar_nuevo_registro);
  }
}
