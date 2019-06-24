import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { URLSearchParams } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class EMailNotificacionService {

  constructor(private http:Http) { }
  
  fn_guarda_e_mail_notificacion(e_mail:string)
  {
		console.log(e_mail);
		let urlSearchParams=new URLSearchParams();
		urlSearchParams.append("e_mail",e_mail);
		return this.http.post(environment.api_url+'e_mail_notificacion/',
			urlSearchParams
		)
		.pipe(map((res:Response)=>res.json()));
	  
	  
  }
}
