import { Injectable } from '@angular/core';
import { Estado } from './catalogos.model';
@Injectable({
  providedIn: 'root'
})
export class EstadoService {
	private estado: Estado[];
	
  constructor() { 
	this.estado=[
		{id_estado:1,estado:'Nuevo Leon'},
			{id_estado:2,estado:'Tamaulipas'}
	];
  }
  
  getEstados()
  {
	  return this.estado;
  }
}
