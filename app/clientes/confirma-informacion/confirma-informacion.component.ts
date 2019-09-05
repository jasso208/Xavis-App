import { Component, OnInit } from '@angular/core';
import { DireccionEnvioTemporalService } from './../direccion-envio-temporal.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { GuardaVentaService } from './../guarda-venta.service';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import {CarritoComprasService} from './../../producto/carrito-compras.service';

@Component({
  selector: 'app-confirma-informacion',
  templateUrl: './confirma-informacion.component.html',
  styleUrls: ['./confirma-informacion.component.css']
})
export class ConfirmaInformacionComponent implements OnInit {
	public mostrar:boolean;

	public productos:any[]=[{}];
	public subtotal_aux:number=0;
    public subtotal:number=0;
    public iva_aux:number=0;
    public iva:number=0;
    public envio:number=0;
    public total_aux:number=0;
    public total:number=0;
	  cont_productos:number=0;

  constructor(private car_service:CarritoComprasService,private r: Router,private det:DireccionEnvioTemporalService) { }
	public nombre:string="";
	public apellido_p:string="";
	public apellido_m:string="";
	public telefono:string="";
	public calle:string="";
	public cp:string="";
	public municipio:string="";
	public estado:string="";
	public pais:string="";
	public e_mail:string="";
	public referencia:string="";
	public numero_interior:string="";
	public numero_exterior:string="";
	public rfc:string="";
	cliente:FormGroup;


  ngOnInit() {
  //para mostrar o ocultar el div hover
			this.mostrar=false;
			
			
			this.consultaCarrito();
			this.cliente=new FormGroup(
					{
						nombre:new FormControl(this.nombre,[Validators.required]),
						apellido_p:new FormControl(this.apellido_p,[Validators.required]),
						apellido_m:new FormControl(this.apellido_m,[Validators.required]),
						telefono:new FormControl(this.telefono,[Validators.required]),
						calle:new FormControl(this.calle,[Validators.required]),
						cp:new FormControl(this.cp,[Validators.required]),
						municipio:new FormControl(this.municipio,[Validators.required]),
						estado:new FormControl(this.estado,[Validators.required]),
						pais:new FormControl(this.pais,[Validators.required]),
						e_mail:new FormControl(this.e_mail,[Validators.required]),
						referencia:new FormControl(this.referencia,[Validators.required]),
						numero_interior:new FormControl(this.numero_interior,[Validators.required])	,		
						numero_exterior:new FormControl(this.numero_exterior,[Validators.required])			,
						rfc:new FormControl(this.rfc)
					});
					
			//como ya solo se va a confirmar la venta, no consultamos la informacion
			//de la cuenta, si no la confirmo en el paso anterior.
			this.det.fn_direccion_envio_temporal_get()
			.subscribe(
			data=>
			{

				this.nombre=data[0].nombre;
				this.apellido_p=data[0].apellido_p;
				this.apellido_m=data[0].apellido_m;
				this.telefono=data[0].telefono;
				this.calle=data[0].calle;
				this.cp=data[0].cp;
				this.municipio=data[0].municipio;
				this.estado=data[0].estado;
				this.pais=data[0].pais;
				this.e_mail=data[0].e_mail;
				this.referencia=data[0].referencia;
				this.numero_interior=data[0].numero_interior;
				this.numero_exterior=data[0].numero_exterior;
				this.rfc=data[0].rfc;
				this.cliente=new FormGroup(
					{
						nombre:new FormControl(this.nombre,[Validators.required]),
						apellido_p:new FormControl(this.apellido_p,[Validators.required]),
						apellido_m:new FormControl(this.apellido_m,[Validators.required]),
						telefono:new FormControl(this.telefono,[Validators.required]),
						calle:new FormControl(this.calle,[Validators.required]),
						cp:new FormControl(this.cp,[Validators.required]),
						municipio:new FormControl(this.municipio,[Validators.required]),
						estado:new FormControl(this.estado,[Validators.required]),
						pais:new FormControl(this.pais,[Validators.required]),
						e_mail:new FormControl(this.e_mail,[Validators.required]),
						referencia:new FormControl(this.referencia,[Validators.required]),
						numero_interior:new FormControl(this.numero_interior,[Validators.required])	,		
						numero_exterior:new FormControl(this.numero_exterior,[Validators.required])			,
						rfc:new FormControl(this.rfc)
					}
				);

			}
			);
  }

   public consultaCarrito()
  {	  
	
    this.car_service.consultaCarrito()
    .subscribe(data=>{
		
		this.productos=data;
			this.cont_productos=this.productos.length;
		var x=0;		
		this.subtotal_aux=0;
		
		for(x=0;x<this.productos.length;x++)
		{
			this.subtotal_aux=this.subtotal_aux+this.productos[x].precio*this.productos[x].cantidad;
		}		
		
		//this.subtotal_aux=this.subtotal_aux;
		//this.iva_aux=this.subtotal_aux/0.16;
		//this.total_aux=this.subtotal_aux+this.iva_aux+this.envio;
		
		this.total=(this.subtotal_aux);
		this.subtotal=((this.subtotal_aux/1.16));
		this.iva=((this.total-this.subtotal));
	
    });
  }
  
  fn_regresar()
  {
  
    this.r.navigate(['/alta_cliente']);
  }
  fn_forma_pago()
  {
  	this.r.navigate(['/formas-pago']);
  }

}
