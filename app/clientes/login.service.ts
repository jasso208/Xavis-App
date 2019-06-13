import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }
  
  public fn_login(login:any)
  {
	let urlSearchParams=new URLSearchParams();
	urlSearchParams.append("e_mail",login.value.e_mail_login);
	urlSearchParams.append("psw",login.value.psw_login);
	urlSearchParams.append("session",localStorage.getItem("session"));
	
	 return this.http.post(environment.api_url+'login_usr/',
		urlSearchParams)
		.pipe(
			map(
				(res:Response)=>res.json()
				)
		);
	
  }
}
