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
	public mostrar_cambio_contrasena:boolean;
	public mostrar_detalle:boolean;
	public cargando:boolean;
	public cliente:FormGroup;
  public cambio_contrasena:FormGroup;
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
  public psw_actual:string="";
  public psw_nueva:string="";
  public psw_nueva_conf:string="";
  public msj:string="";
  public show_error_actualiza:boolean;
  public show_error_psw_actual:boolean;
  public show_error_psw:boolean;
  public show_error_psw_conf:boolean;
  public hay_ventas:boolean;
  public mostrar_msj:boolean;
 public msj_temporal:string;
  constructor(private cvs:ConsultaVentasService,private vul:ValidaUsrLogueadoService,private registra_cliente:RegistraClienteService) { }

  ngOnInit() {
	     this.mostrar_detalle=false;
	     this.mostrar_cambio_contrasena=false;
	     this.cargando=true;
       this.fn_get_informacion_cuenta();
       this.fn_reinicia_msj_error();

	    this.fn_mostrar_ventas();
	this.cliente=new FormGroup({
		nombre:new FormControl(this.nombre,[Validators.required]),
		apellido_p:new FormControl(this.apellido_p,[Validators.required]),
		apellido_m:new FormControl(this.apellido_m),
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

    this.cambio_contrasena=new FormGroup({
      psw_actual:new FormControl(this.psw_actual,[Validators.required]),
      psw_nueva:new FormControl(this.psw_nueva,[Validators.required]),
      psw_nueva_conf:new FormControl(this.psw_nueva_conf,[Validators.required])

    });
  }

  fn_reinicia_msj_error()
  {
    this.show_error_actualiza=false;
    this.show_error_psw_actual=false;
    this.show_error_psw=false;
    this.show_error_psw_conf=false;
  }
    fn_actualiza_psw()
    {
      this.fn_reinicia_msj_error();


      var ok=0;
      if(this.cambio_contrasena.value.psw_nueva!=this.cambio_contrasena.value.psw_nueva_conf)
      {
        this.msj="la confirmacion de la contraseña no coincide";
        this.show_error_actualiza=true;
        ok=1;
      }
      if (this.cambio_contrasena.value.psw_actual=="")
      {
        this.show_error_psw_actual=true;

        ok=1;
      }

      if (this.cambio_contrasena.value.psw_nueva=="")
      {
        this.show_error_psw=true;

        ok=1;
      }
      if (this.cambio_contrasena.value.psw_nueva_conf=="")
      {
        this.show_error_psw_conf=true;

        ok=1;
      }

      if (ok==1)
      {
        return 0;
      }

      this.cargando=true;
    this.registra_cliente.fn_actualiza_psw(this.cambio_contrasena)
    .subscribe(
    data=>
    {
      console.log(data);
      if (data[0].estatus=="0")
      {

        this.show_error_actualiza=true;
        this.msj=data[0].msj;
      }
      else
      {

        this.msj_temporal="Tu informacion se actualizo correctamente"
        this.mostrar_msj=true;
        setInterval(()=>{this.fn_oculta_msj();},3000);
        this.cambio_contrasena.value.psw_actual="";
        this.cambio_contrasena.value.psw_nueva="";
        this.cambio_contrasena.value.psw_nueva_conf="";
      }
      this.cargando=false;
    }
    );
    }

  //del grid se selecicona una venta que pasa como parametro el id de la venta para extraer
  //la venta.
  fn_consulta_detalle_ventas(id_venta:string)
  {

    this.cargando=true;
  this.mostrar_detalle=true;
  this.cvs.fn_consulta_detalle_ventas(id_venta)
  .subscribe(
    data=>
    {

      this.detalle_venta=data;

    this.cargando=false;
    }

  );
  }

  fn_actualiza_cliente()
  {


		this.cargando=true;
	  this.registra_cliente.fn_actualiza_cliente(this.cliente)
	  .subscribe(
		data=>
		{

      this.cargando=false;
			if (data[0].estatus=="0")
			{
        this.msj_temporal="No se pudo actualizar la informacion.";
        this.mostrar_msj=true;
        setInterval(()=>{this.fn_oculta_msj();},3000);
			}
			else
			{
        this.msj_temporal="Tu informacion se actualizo correctamente";
        this.mostrar_msj=true;

        setInterval(()=>{this.fn_oculta_msj();},3000);
				//alert("Tu informacion se actualizo correctamente");
			}

		}
	  );
  }
  fn_oculta_msj()
  {
    this.mostrar_msj=false;
    clearInterval();
  }
  fn_cerrar_detalle()
  {
	   this.mostrar_detalle=false;
  }
  fn_get_informacion_cuenta()
  {

	  			this.cargando=true;
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
							apellido_m:new FormControl(this.apellido_m),
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

						this.cargando=false;



				}
			) ;
  }


  fn_mostrar_cuenta()
  {



  	this.mostrar_ventas=false;
  	this.mostrar_cuenta=true;
  	this.mostrar_cambio_contrasena=false;

  }
  fn_mostrar_cuenta_2()
  {
    this.mostrar_cambio_contrasena=false;
    this.mostrar_ventas=false;
	   if (this.mostrar_cuenta)
	  {
		  this.mostrar_cuenta=false;
	  }
	  else
	  {
		  this.mostrar_cuenta=true;
	  }

  }

    fn_mostrar_cambio_contrasena()
  {


  	this.mostrar_ventas=false;
  	this.mostrar_cuenta=false;
  	this.mostrar_cambio_contrasena=true;



  }

  fn_mostrar_cambio_contrasena_2()
  {
    this.mostrar_cuenta=false;
    this.mostrar_ventas=false;
	 if (this.mostrar_cambio_contrasena)
	  {
		  this.mostrar_cambio_contrasena=false;
	  }
	  else
	  {
		  this.mostrar_cambio_contrasena=true;
	  }

  }
  fn_mostrar_ventas()
  {
  		this.mostrar_cuenta=false;
  		this.mostrar_cambio_contrasena=false;
      this.mostrar_ventas=true;
      this.cvs.fn_consulta_ventas()
      .subscribe(
         data=>
           {

               try{
                 var x=data[0].id_venta;
                 this.hay_ventas=true;
               }
               catch (e){
                     this.hay_ventas=false;
               }
                this.ventas=data;
                this.cargando=false;
           }
           );


  }
  fn_mostrar_ventas_2()
  {


    this.mostrar_cuenta=false;
    this.mostrar_cambio_contrasena=false;
		  if (this.mostrar_ventas)
		  {
			  this.mostrar_ventas=false;
		  }
		  else
		  {
			  this.mostrar_ventas=true;
		  }


  }


}
