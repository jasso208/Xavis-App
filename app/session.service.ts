import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:Http) { }

  //esta funcion la usamos para cerrar session.
  //para cerrar session solo generamos un nuevo token, de esta forma
  // el nuevo token no esta ligada a ninguna cuenta
  fn_kill_session()
  {
    let urlSearchParams=new URLSearchParams();
    urlSearchParams.append("session",localStorage.getItem("session"));
    return this.http.post(environment.api_url+'kill_session/',
			urlSearchParams
		)
		.pipe(map((res:Response)=>res.json()));

  }

  setSession()
  {
     //creamos la variable de session
     //la session se genera, este o no identificado el usuario
     //para permitir que este pueda comprar aunque no este registrado.

        if (localStorage.getItem("session")==null || localStorage.getItem("session")=="")
        {
			         var dt=new Date();
		           var month=(dt.getMonth()+1).toString();
          		var day=(dt.getDate()).toString();
          		var year=dt.getFullYear();
          		var hora=(dt.getHours()).toString();
          		var minuto=(dt.getMinutes()).toString();
          		var segundo=(dt.getSeconds()).toString();
          		var milisegundos=(dt.getMilliseconds()).toString();



		if (month.length==1)
		{
			month='0'+month;
		}
		if (day.length==1)
		{
			day='0'+day;
		}
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


          localStorage.setItem("session",day+month+year+hora+minuto+segundo+milisegundos);
        }
  }
}
