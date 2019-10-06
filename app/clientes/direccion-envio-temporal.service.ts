import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DireccionEnvioTemporalService {

  constructor(private http:Http) { }

  fn_direccion_envio_temporal_get()
  {

	return this.http.get(environment.api_url+'direccion_envio_temporal/',
		{
			params:
			{
				session:localStorage.getItem("session")
			}
		}
	)
	.pipe(map((res:Response)=>res.json()))
  }

  fn_direccion_envio_temporal_inserta(cliente_temporal)
  {
	  let urlSearchParams=new URLSearchParams();
	  urlSearchParams.append("session",localStorage.getItem("session"));
	  urlSearchParams.append("nombre",cliente_temporal.value.nombre);
	  urlSearchParams.append("apellido_p",cliente_temporal.value.apellido_p);
	  urlSearchParams.append("apellido_m",cliente_temporal.value.apellido_m);
	  urlSearchParams.append("telefono",cliente_temporal.value.telefono);
	  urlSearchParams.append("e_mail",cliente_temporal.value.e_mail);
	  urlSearchParams.append("rfc",cliente_temporal.value.rfc);
	  urlSearchParams.append("calle",cliente_temporal.value.calle);
	  urlSearchParams.append("numero_interior",cliente_temporal.value.numero_interior);
	  urlSearchParams.append("numero_exterior",cliente_temporal.value.numero_exterior);
	  urlSearchParams.append("cp",cliente_temporal.value.cp);
	  urlSearchParams.append("municipio",cliente_temporal.value.municipio);
	  urlSearchParams.append("estado",cliente_temporal.value.estado);
	  urlSearchParams.append("pais",cliente_temporal.value.pais);
	  urlSearchParams.append("referencia",cliente_temporal.value.referencia);
	  return this.http.post(environment.api_url+'direccion_envio_temporal/',
			urlSearchParams
		)
		.pipe(
			map(
				(res:Response)=>res.json()
			)
		);
  }
}
