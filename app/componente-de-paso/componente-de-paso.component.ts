import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-componente-de-paso',
  templateUrl: './componente-de-paso.component.html',
  styleUrls: ['./componente-de-paso.component.css']
})
export class ComponenteDePasoComponent implements OnInit {

  constructor(private ruta_activa:ActivatedRoute,private router:Router) { }
  
  ngOnInit() {
    
    var  tipo_paso=this.ruta_activa.snapshot.params.tipo_paso;

    //tipo_paso=1 indica que es busqueda.y redireccionara a lapantalla de resultados de busqueda.
    if (tipo_paso==1)
    {
		var  tipo_busqueda=this.ruta_activa.snapshot.params.param_0;  //1: indica q es busqueda por categoria    	  
																	  //2: indica q se buscara palabras en el detalle del producto
		var param_1=this.ruta_activa.snapshot.params.param_1;//nos diara la categoria que queremos buscar
		this.router.navigate(['/producto/resultado_busqueda/'+tipo_busqueda+'/'+param_1]);
	  
    }

    //tipo_paso=2 indica que buscamos el detalle de algun producto
    if(tipo_paso==2)
    {
      var id_producto=this.ruta_activa.snapshot.params.param_0;
      this.router.navigate(['producto/detalle/'+id_producto]);
    }
	
	//tipo_paso=2 indica que buscamos el detalle de algun producto
    if(tipo_paso==3)
    {
      var id_blog=this.ruta_activa.snapshot.params.param_0;
      this.router.navigate(['blog/detalle/'+id_blog]);
    }
    


  }

}

//	this.router.navigate(['/producto/carrito_compras']);
/// producto/resultado_busqueda/1/2
