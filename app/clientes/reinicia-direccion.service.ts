import { Injectable } from '@angular/core';
import { Http,Response,URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReiniciaDireccionService {

  constructor(private http:Http) { }

  fn_reinicia_direccion_temporal()
  {

      let urlSearchParams=new URLSearchParams();

      urlSearchParams.append("session",localStorage.getItem("session"));

      return this.http.post(environment.api_url+'reinicia_direccion_envio/',
        urlSearchParams
      )
      .pipe(
        map(
          (res:Response)=>res.json()
        )

      )
      ;
  }

}
