import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado,Pais,Municipio } from '../../catalogos/catalogos.model';
import { MunicipioService } from '../../catalogos/municipio.service';
import { EstadoService} from '../../catalogos/estado.service';
import { PaisService} from '../../catalogos/pais.service';
import { DireccionEnvioService } from './../direccion-envio.service';
import { DireccionEnvioTemporalService } from './../direccion-envio-temporal.service';
import {GuardaVentaService} from './../guarda-venta.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { ValidaUsrLogueadoService } from './../valida-usr-logueado.service';
@Component({
		selector: 'app-alta-clientes',
		templateUrl: './alta-clientes.component.html',
		styleUrls: ['./alta-clientes.component.css']
	}
)
export class AltaClientesComponent implements OnInit {
	municipios:any=[];
	leyenda_folio:string="";
	cliente:FormGroup;
	transaccion={
		'display':'none'
	}
	constructor(private det:DireccionEnvioTemporalService,private municipiosService: MunicipioService,private estadoService:EstadoService,private paisService: PaisService,private direccion_envio:DireccionEnvioService,public router:Router,private guarda_venta:GuardaVentaService,private vul:ValidaUsrLogueadoService) { }
	public mostrar:boolean;
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
	ngOnInit() {	
		this.mostrar=false;
		//si es uno es porque si esta logueado.
		if (localStorage.getItem("esta_logueado")=="1")
		{
			//validamos si el usuario esta logueado o no
			this.vul.fn_valida_usr_logueado()
			.subscribe(
				data=>
				{		
					
					
					
					//si esta logueado
					if (data[0].estatus=="1")
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
					else//si no esta logueado, buscamos si tiene direccion temporal insertada
					{
						console.log("jasso");
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
						);
						
					}
					
					
				}
			) ;
			
		}
		else
		{
			
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
								}
							);
								
							}
						);
		}
		
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
								})
		
	}
	
	insertaDireccionEnvio()
	{			
			this.mostrar=true;
			this.det.fn_direccion_envio_temporal_inserta(this.cliente)
			.subscribe
			(
				data=>
				{
					//si el estatus es cero, es que fallo al guardar la direccion temporal.
					if (data[0].estatus=="0")
					{
						this.mostrar=false;
						alert(data[0].msj);
						
					}
					else
					{
						
						this.router.navigate(['/formas-pago']);
					}
					
					

				}
			);			
			
				
	}
}
