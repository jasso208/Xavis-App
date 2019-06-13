import { Injectable } from '@angular/core';

import { Municipio }  from './catalogos.model';

import { environment } from '../../environments/environment';

import {  Http,Response} from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {


	
	constructor(private http:Http) { 

	}
	
	getMunicipios()
	{
		
		return this.http.get(environment.api_url+'inventario/get_municipios')
		.pipe(
			map(
			
				(res:Response)=>res.json()
				
				
				)
			)
		
	}
  
}
