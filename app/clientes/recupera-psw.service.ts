import { Injectable } from '@angular/core';
import { Http,Response,URLSearchParams } from '@angular/http';
import {map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecuperaPswService {

  public token:string;
  constructor(private http:Http) { }

  fn_recupera_psw(e_mail:string)
  {
    this.fn_genera_token()

    let urlSearchParams=new URLSearchParams();
    urlSearchParams.append("session",this.token);
    urlSearchParams.append("e_mail",e_mail);

    return this.http.post(
      environment.api_url+'recupera_psw/',urlSearchParams
    ).pipe(
      map(
        (res:Response)=>res.json()
      )
    );
  }
  fn_genera_token()
  {
    var dt=new Date();

  var hora=(dt.getHours()).toString();
  var minuto=(dt.getMinutes()).toString();
  var segundo=(dt.getSeconds()).toString();
  var milisegundos=(dt.getMilliseconds()).toString();

  if(hora.length==1)
  {
    hora='0'+hora;
  }
  if(minuto.length==1)
  {
    minuto='0'+minuto;
  }
  if(segundo.length==1)
  {
    segundo='0'+segundo;
  }

  if(milisegundos.length==1)
  {
    milisegundos='000'+milisegundos;
  }
  else if(milisegundos.length==2)
  {
    milisegundos='00'+milisegundos;
  }
  else if(milisegundos.length==3)
  {
    milisegundos='0'+milisegundos;
  }


        this.token= hora+minuto+segundo+milisegundos;

      }
}
