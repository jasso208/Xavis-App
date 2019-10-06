import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CambiaPswTokenService {

  constructor(private http:Http) { }

  fn_cambia_psw_token(form:any)
  {
    let urlSearchParams=new URLSearchParams();
    urlSearchParams.append("token",form.value.token);
    urlSearchParams.append("psw_nueva",form.value.psw_nueva);


    return this.http.post(environment.api_url+'cambia_psw_token/',
     urlSearchParams
   )
   .pipe(
     map(
       (res:Response)=>res.json()
     )
   );

  }
}
