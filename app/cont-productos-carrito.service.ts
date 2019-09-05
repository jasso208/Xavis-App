import { Injectable,Output,EventEmitter } from '@angular/core';
import { Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContProductosCarritoService {

  constructor(private http:Http) { }
  
  cont_prod="0";

  @Output() change:EventEmitter<string>=new EventEmitter();

  fn_establece_cont(cont:any)
  {
  	this.cont_prod=cont;
  	this.change.emit(this.cont_prod);
  }

  fn_cont_prod_carrito()
  {
	return this.http.get(environment.api_url+'ventas/cont_prod_carrito/',
		{
			params:{
				'session':localStorage.getItem("session")
			}
		}
	) 
	.pipe(
		map(
			(res:Response)=>res.json()
		)
	)
  }
}
