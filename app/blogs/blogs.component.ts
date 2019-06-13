import { Component, OnInit } from '@angular/core';
import { BlogsServicesService } from './../blogs-services.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
	public blogs:any=[];
  constructor(private blog_services:BlogsServicesService  ) 
  { 
  
  }
  
  ngOnInit() 
  {	
	  this.blog_services.consulta_blogs()
	  .subscribe(
		data=>
		{	
			this.blogs=data;
		}
	  );
  }

}
