import { Component, OnInit } from '@angular/core';
import { BuscaProductosService } from './../busca-productos.service';
import {ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

public descuento:number=1;
	public productos:any=[];
	public cargando:boolean;
  constructor(private busca_prod_service:BuscaProductosService,private ruta_activa:ActivatedRoute) { }

  ngOnInit() {
	  var tipo_busqueda:string;
	  var id_categoria:string;
	  this.cargando=true;
	  tipo_busqueda=this.ruta_activa.snapshot.params.tipo_busqueda;
	  
	  //tipo_busqueda=1 india que es busqueda por categoria
	  //tipo_busqueda=2 buscar palabras en el detalle
	  //if (tipo_busqueda=="1" )
	  //{
		id_categoria=this.ruta_activa.snapshot.params.param_1;
		this.busca_prod_service.busca_productos(tipo_busqueda,id_categoria)
		.subscribe(
			data=>
			{
				this.productos=data;
				this.cargando=false;							
			}
		);
	  //}
	  
  }

}
