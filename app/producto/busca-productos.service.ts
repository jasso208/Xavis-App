import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BuscaProductosService {

  constructor(private http:Http) { }
  
  busca_productos(tipo_busqueda:string,param1:string)
  {
	  return this.http.get(environment.api_url+'inventario/busca_productos/',
		  {
			params:
			{
				"tipo_busqueda":tipo_busqueda,
				"param1":param1
			}
		  }
	  )
	  .pipe(map((res:Response)=>res.json()));
  }
}
