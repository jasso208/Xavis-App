import { Component, OnInit } from '@angular/core';
import { DetalleBlogService } from './../detalle-blog.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detalle-blog',
  templateUrl: './detalle-blog.component.html',
  styleUrls: ['./detalle-blog.component.css']
})
export class DetalleBlogComponent implements OnInit {

	public d_b:any=[];
	rutaActiva:any;
	id_blog:any;
	
  constructor(private detalle_blog:DetalleBlogService,private ruta: ActivatedRoute) 
  { 
	this.rutaActiva=ruta;
  }

  ngOnInit() {
	  this.id_blog=this.rutaActiva.snapshot.params.id_blog;
	   this.detalle_blog.get_detalle_blog(this.id_blog)
	  .subscribe(
		data=>
			{					
				console.log(data[0]);
				this.d_b=data[0];
			}
		);
  }

}
