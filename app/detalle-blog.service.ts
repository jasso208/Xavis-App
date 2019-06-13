import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleBlogService {

  constructor(private http:Http) { }
  
  get_detalle_blog(id_blog:any)
  {
	  return this.http.get(environment.api_url+'blog/detalle_blog/',
		{
			params:{
				'id_blog':id_blog
			}
		}
	  )
	  .pipe(map((res:Response)=>res.json()))
	  
  }
}
