import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaVentasService {

  constructor(private http:Http) 
  { }
  
  public fn_consulta_ventas()
  {
	  return this.http.get(environment.api_url+'ventas/conslta_ventas_cliente/',
		{
			params:{
				"session":localStorage.getItem("session")
			}
		})
		.pipe(
			map(
				(res:Response)=>res.json()
				)
		);
  }
  
  public fn_consulta_detalle_ventas(id_venta:string)
  {
	  return this.http.get(environment.api_url+'ventas/consulta_detalle_venta/',
		{
			params:{
				"id_venta":id_venta
			}
		})
		.pipe(
			map(
				(res:Response)=>res.json()
				)
		);
	  
	  
	  
  }
  
  

}
