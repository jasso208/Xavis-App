import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContProductosCarritoService {

  constructor(private http:Http) { }
  
  cont_prod_carritocont_prod_carrito()
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
