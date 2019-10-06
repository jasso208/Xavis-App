import { Injectable,Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuestraRecuperaPswService {
  public mostrar_recupera_psw:boolean;
@Output() change:EventEmitter<boolean>=new EventEmitter();
  constructor() { }

  fn_recupera_psw(mostrar_recupera_psw:boolean)
  {
      this.mostrar_recupera_psw=mostrar_recupera_psw;
      this.change.emit(this.mostrar_recupera_psw);
  }
}
