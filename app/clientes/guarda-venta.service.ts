import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardaVentaService {

  constructor(private http:Http) { 
  
  }
  
  public fn_inserta_venta()
  {
	 let urlSearchParams=new URLSearchParams();
	 urlSearchParams.append("session",localStorage.getItem("session"));
	 return this.http.post(environment.api_url+'ventas/guarda_venta/',
		urlSearchParams)
		.pipe(
			map(
				(res:Response)=>res.json()
				)
		);
	  
  }
}
