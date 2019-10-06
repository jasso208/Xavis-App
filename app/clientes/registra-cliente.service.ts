import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistraClienteService {

  constructor( private http:Http)
  { }

  fn_actualiza_psw(psw:any)
  {
  	  let urlSearchParams=new URLSearchParams();
      urlSearchParams.append("session",localStorage.getItem("session"));
      urlSearchParams.append("psw_actual",psw.value.psw_actual);
      urlSearchParams.append("psw_nueva",psw.value.psw_nueva);

      return this.http.post(environment.api_url+'actualiza_psw/',
       urlSearchParams
     )
     .pipe(
       map(
         (res:Response)=>res.json()
       )
     );

  }
  fn_registra_cliente(cliente:any)
  {
	  let urlSearchParams=new URLSearchParams();
	  urlSearchParams.append("nombre","");
	  urlSearchParams.append("apellido_p","");
	  urlSearchParams.append("apellido_m","");
	  urlSearchParams.append("telefono","");
	  urlSearchParams.append("e_mail",cliente.value.e_mail_reg_cliente);
	  urlSearchParams.append("rfc","");
	  urlSearchParams.append("calle_reg","");
	  urlSearchParams.append("numero_interior","");
	  urlSearchParams.append("numero_exterior","");
	  urlSearchParams.append("cp","");
	  urlSearchParams.append("municipio","");
	  urlSearchParams.append("estado","");
	  urlSearchParams.append("pais","");
	  urlSearchParams.append("referencia","");
	  urlSearchParams.append("psw",cliente.value.psw_reg_cliente)
	  return this.http.post(environment.api_url+'alta_cliente/',
			urlSearchParams
		)
		.pipe(
			map(
				(res:Response)=>res.json()
			)
		);
  }
  fn_actualiza_cliente(cliente:any)
  {
	 let urlSearchParams=new URLSearchParams();

	  urlSearchParams.append("session",localStorage.getItem("session"));
	  urlSearchParams.append("nombre",cliente.value.nombre);
	  urlSearchParams.append("apellido_p",cliente.value.apellido_p);
	  urlSearchParams.append("apellido_m",cliente.value.apellido_m);
	  urlSearchParams.append("telefono",cliente.value.telefono);
	  urlSearchParams.append("e_mail",cliente.value.e_mail);
	  urlSearchParams.append("rfc",cliente.value.rfc);
	  urlSearchParams.append("calle_reg",cliente.value.calle);
	  urlSearchParams.append("numero_interior",cliente.value.numero_interior);
	  urlSearchParams.append("numero_exterior",cliente.value.numero_exterior);
	  urlSearchParams.append("cp",cliente.value.cp);
	  urlSearchParams.append("municipio",cliente.value.municipio);
	  urlSearchParams.append("estado",cliente.value.estado);
	  urlSearchParams.append("pais",cliente.value.pais);
	  urlSearchParams.append("referencia",cliente.value.referencia);
	  urlSearchParams.append("psw",cliente.value.psw)
	  return this.http.post(environment.api_url+'alta_cliente/',
			urlSearchParams
		)
		.pipe(
			map(
				(res:Response)=>res.json()
			)
		);
  }
}
