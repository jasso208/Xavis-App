import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

	public txt_busqueda:string="";
  constructor(private router:Router) { }

  ngOnInit() {
	 
  }
  

}
