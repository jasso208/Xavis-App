
import { Injectable,Output,EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MuestraLoginService {
public mostrar_login:boolean;
@Output() change:EventEmitter<boolean>=new EventEmitter();
  constructor() { }
  fn_login(mostrar_login:boolean)
  {
    this.mostrar_login=mostrar_login;

    this.change.emit(this.mostrar_login);

  }

}
