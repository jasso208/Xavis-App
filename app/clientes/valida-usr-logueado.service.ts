import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ValidaUsrLogueadoService {

  constructor(private http:Http) { }
  
   fn_valida_usr_logueado()
  {
	  return this.http.get(environment.api_url+'valida_logueado/',
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
}
