import { Injectable } from '@angular/core';
import { Pais } from './catalogos.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
private pais:Pais[];
  constructor() { 
	this.pais=[
	{id_pais:1,pais:'Mexico'}
	]
  }
  
  getPaises()
  {
	  return this.pais;
	  
  }
}
