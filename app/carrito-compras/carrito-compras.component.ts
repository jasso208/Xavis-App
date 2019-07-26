import { Component, OnInit,NgZone } from '@angular/core';
import {CarritoComprasService} from './../producto/carrito-compras.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

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
	public btn_terminar_venta:boolean;
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
	this.fn_jquery(); 
	this.mostrar=false;
	this.btn_terminar_venta=false;
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
		//en caso de estar logueado, mostramos el boton para terminar venta.
		if (localStorage.getItem("esta_logueado")=="1")
		{
			this.btn_terminar_venta=true;
		}
		
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
				//this.msj=data[0].msj;
				this.msj=data[0].msj;				
			}
			else
			{				
				this.msj="Se elimino correctamente.";				
				this.consultaCarrito();
				
			}
			this.mostrar=true;
		}
	);
	this.mostrar=false;
  }

public fn_aceptar_msj()
	{
		this.mostrar=false;
	}
	
	public fn_jquery()
	{
		$(document).ready(function()
			{
				$("#btn_login_c").click(
					function()
					{
						$(".cls_login_id").show();
						$("#contenedor_carrito_compras").hide();
						$("#contenedor_carrito_compras").hide();
					}
				);
			}
		);
	}

}
