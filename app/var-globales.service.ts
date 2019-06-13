import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarGlobalesService {
	public nombre_empresa:string="Xavis";
  constructor() { }
  
  //establecemos el nombre de la empresa(el logo que esta en el index)
  set_nombre_empresa(nombre_empresa:string)
  {
	  this.nombre_empresa=nombre_empresa;
  }
  //obtenemos el nombre de la empresa(el logo que esta en el index)
  get_nombre_empresa()
  {
	  return this.nombre_empresa;
  }
  
}
