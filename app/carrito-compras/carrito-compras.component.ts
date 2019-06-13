import { Component, OnInit,NgZone } from '@angular/core';
import {CarritoComprasService} from './../producto/carrito-compras.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  productos:any[]=[{}];
  cont_productos:number=0;
	public msj:string="";
	public mostrar:boolean;
    public subtotal_aux:number=0;
    public subtotal:string="0";
    public iva_aux:number=0;
    public iva:string="0";
    public envio:number=0;
    public total_aux:number=0;
    public total:string="0";
  constructor(private car_service:CarritoComprasService,private router:Router,private zone:NgZone) {	
		window['angularComponentReference'] = {
			zone: this.zone,
			componentFn: () => this.consultaCarrito(),
			component: this,
		};
	 }

  ngOnInit() {
	this.mostrar=true;
    this.consultaCarrito();
  }

  public consultaCarrito()
  {	  
	
    this.car_service.consultaCarrito()
    .subscribe(data=>{
		console.log(data);
		this.productos=data;
		this.cont_productos=this.productos.length;
		var x=0;		
		this.subtotal_aux=0;
		for(x=0;x<this.productos.length;x++)
		{
			this.subtotal_aux=this.subtotal_aux+this.productos[x].precio*this.productos[x].cantidad;
		}
		
		
		this.subtotal_aux=this.subtotal_aux;
		this.iva_aux=this.subtotal_aux/1.16;
		this.total_aux=this.subtotal_aux+this.iva_aux+this.envio;
		
		this.subtotal=parseFloat((this.subtotal_aux).toString()).toFixed(2);
		this.iva=parseFloat((this.iva_aux).toString()).toFixed(2);
		this.total=parseFloat((this.subtotal_aux).toString()).toFixed(2);
	
    });
  }
  public eliminaProductoCarrito(id:string)
  {	
	this.mostrar=true;
	this.car_service.eliminaProductoCarrito(id)
	.subscribe(
		data=>{
			if(data[0].estatus==0)
			{
				this.msj=data[0].msj;
				//alert(data[0].msj);
			}
			else
			{				
				alert("Se elimino correctamente.");
				this.consultaCarrito();
			}
		}
	);
	this.mostrar=false;
  }



}
