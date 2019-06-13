import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

	
	
	constructor(private http: Http)
	{ 
		
	}
	
	getProductos (id_producto:number) 
	{
		
	  return this.http.get(environment.api_url+'inventario/detalle_producto/',
			{
					params:{
						'id_producto':id_producto
					}
			}
		)
		.pipe(map((res:Response)=>res.json()))
		
	}
}
