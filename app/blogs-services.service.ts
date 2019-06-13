import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Http,Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsServicesService {

  constructor(private http:Http) { }
  consulta_blogs()
  {
		return this.http.get(environment.api_url+'blog/consulta_blogs')
		.pipe(
			map(
					(res:Response)=>res.json()
				)
			);
	  
  }
}
