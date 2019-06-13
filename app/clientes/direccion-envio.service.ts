import { Injectable } from '@angular/core';
import { Http,Response,URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionEnvioService {

  constructor(private http:Http) 
  {
  }
  
  insertaDireccionEnvio(cliente:any)
  {
		let urlSearchParams=new URLSearchParams();
		urlSearchParams.append("session",localStorage.getItem("session"));
		urlSearchParams.append("nombre",cliente.value.nombre);
		urlSearchParams.append("apellido_p",cliente.value.apellido_p);
		urlSearchParams.append("apellido_m",cliente.value.apellido_m);
		urlSearchParams.append("telefono",cliente.value.telefono);
		urlSearchParams.append("calle",cliente.value.calle);
		urlSearchParams.append("cp",cliente.value.cp);
		urlSearchParams.append("municipio",cliente.value.municipio);
		urlSearchParams.append("estado",cliente.value.estado);
		urlSearchParams.append("pais",cliente.value.pais);
		urlSearchParams.append("e_mail",cliente.value.e_mail);
		urlSearchParams.append("referencia",cliente.value.referencia);
		urlSearchParams.append("numero",cliente.value.numero);
		//insertamos direccion de envio, en caso de ya existir direccion de envio, la reemplaza.
		return this.http.post(environment.api_url+'ventas/direccion_envio/',
			urlSearchParams
		)
		.pipe(
			map(
				(res:Response)=>res.json()
			)
		);
	
	  
  }
  
  consultarDireccionEnvio()
  {
	  return this.http.get(environment.api_url+'ventas/direccion_envio/',
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
