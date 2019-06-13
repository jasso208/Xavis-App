import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { URLSearchParams } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

	
  
				
  constructor(private http:Http) { }

  consultaCarrito()
  {
    return this.http.get(environment.api_url+'ventas/carrito_compras/',
		{params:{
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
  eliminaProductoCarrito(id:string)
  {	  
	let urlSearchParams=new URLSearchParams();
	urlSearchParams.append("id",id);
		//django no acepta el metodo delete, por eso se elimina el producto por el metodo POST.
	return this.http.post(environment.api_url+'ventas/elimina_prod_carrito/',
		  urlSearchParams
	  )
	  .pipe(
		map(
			(res:Response)=>res.json()
		)
	  );
  }
  insertaCarrito(id_producto:string,cantidad:string,id_talla:string)
  {
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id_producto', id_producto);
		urlSearchParams.append('cantidad', cantidad);
		urlSearchParams.append('id_talla', id_talla);
		urlSearchParams.append('session', localStorage.getItem("session"));
		
	  return this.http.post(environment.api_url+'ventas/carrito_compras/',
		urlSearchParams
	  )
	  .pipe(
		map(
			(res:Response)=>res.json()
		)
	  )
  }
}
