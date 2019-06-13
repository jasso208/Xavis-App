import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ConsultaVentasService } from './../consulta-ventas.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { ValidaUsrLogueadoService } from './../valida-usr-logueado.service';
import { RegistraClienteService } from './../registra-cliente.service';
@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit {

	public ventas:any;
	public mostrar_ventas:boolean;
	public mostrar_cuenta:boolean;
	public mostrar_detalle:boolean;
	public cliente:FormGroup;
	public detalle_venta:any;
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
	
  constructor(private cvs:ConsultaVentasService,private vul:ValidaUsrLogueadoService,private registra_cliente:RegistraClienteService) { }

  ngOnInit() {
	this.mostrar_ventas=true;
	this.mostrar_detalle=false;
	this.cvs.fn_consulta_ventas()
	.subscribe(
		data=>
		{			
			
			this.ventas=data;
		}
	)
	;	 

	this.cliente=new FormGroup({
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
	this.fn_get_informacion_cuenta();
	

  }
  
  //del grid se selecicona una venta que pasa como parametro el id de la venta para extraer
  //la venta.
  fn_consulta_detalle_ventas(id_venta:string)
  {
		this.mostrar_detalle=true;
		this.cvs.fn_consulta_detalle_ventas(id_venta)
		.subscribe(
			data=>
			{		
				console.log(data[0]);
				this.detalle_venta=data;
			}
			
		);
  }
  
  fn_actualiza_cliente()
  {
	  this.registra_cliente.fn_actualiza_cliente(this.cliente)
	  .subscribe(
		data=>
		{
			console.log(data);
			if (data[0].estatus=="0")
			{
				alert("No se pudo actualizar la informacion.");
			}
			else
			{
				alert("Tu informacion se actualizo correctamente");
			}
		}
	  );
  }
  fn_cerrar_detalle()
  {
	 this.mostrar_detalle=false;
  }
  fn_get_informacion_cuenta()
  {
	  			
			this.vul.fn_valida_usr_logueado()
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
						
						this.cliente=new FormGroup({
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
							numero_interior:new FormControl(this.numero_interior,[Validators.required])			,
							numero_exterior:new FormControl(this.numero_exterior,[Validators.required])			,
							rfc:new FormControl(this.rfc)
						});	
					
					
					
				}
			) ;
  }
  
  
  fn_mostrar_cuenta()
  {
	  
	  if (this.mostrar_cuenta)
	  {
		  this.mostrar_cuenta=false;
	  }
	  else
	  {
		  this.mostrar_cuenta=true;
	  }
  }
  fn_mostrar_ventas()
  {
	  if (this.mostrar_ventas)
	  {
		  this.mostrar_ventas=false;
	  }
	  else
	  {
		  this.mostrar_ventas=true;
	  }
  }
  
  fn_funciones_jquery()
  {
	  
  }

}
