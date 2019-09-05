import { Component,OnInit,HostBinding } from '@angular/core';
import {SessionService} from './session.service';
import { ContProductosCarritoService } from './cont-productos-carrito.service';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import { VarGlobalesService } from './var-globales.service';
import { ValidaUsrLogueadoService } from './clientes/valida-usr-logueado.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {CarritoComprasService} from './producto/carrito-compras.service';
import { EMailNotificacionService } from './e-mail-notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public msj:string="";
	public mostrar:boolean;
	public logueado:boolean;
	title = 'xavis-app';
	public nombre_empresa:string="";
	public btn_login_txt:string="Entrar";
	public btn_salir_txt:string="";
	public e_mail:string="";

	public esta_logueado:number=0;
	public usuario_logueado:string="";
	public cargando:boolean;
	//@HostBinding('class.is-open');
	public cont_prod:string;

	constructor(private car_service:CarritoComprasService,private dbs:EMailNotificacionService,private router:Router,private vul:ValidaUsrLogueadoService,private session:SessionService,private cont_prod_carrito:ContProductosCarritoService,private c_c:CarritoComprasComponent,private globales_service:VarGlobalesService)
	{}
	ngOnInit()
	{
		this.cont_prod_carrito.change.subscribe(cont_prod=>{this.cont_prod=cont_prod});
	 	this.cargando=true;
		this.fn_funciones_jquery();
		this.nombre_empresa=this.globales_service.get_nombre_empresa()
      //esta funcion ejecuta el algoritmo para generar la session, solo en caso de que no exista
		this.session.setSession();
		this.mostrar=false;
	  //validamos si el usuario esta logueado o no
		this.vul.fn_valida_usr_logueado()
		.subscribe(
			data=>
			{
				if (data[0].estatus=="1")
				{
					localStorage.setItem("esta_logueado","1");
					this.logueado=true;
				}
				else
				{
					localStorage.setItem("esta_logueado","0");
					this.logueado=false;
				}

				this.cont_prod_carrito.fn_cont_prod_carrito()
				.subscribe(
					data=>
					{
						this.cont_prod=data[0].cantidad__sum;
						//this.cont_prod_carrito.fn_establece_cont(data[0].cantidad__sum);

						this.cargando=false;
					}
				) ;

			}
		) ;





  }

  fn_muestra_carrito()
  {
    this.car_service.fn_muestra_carrito();
  }
  public fn_cerrar_menu()
  {

	 	$("#menu_encabezado").animate({left:'-70%'});

		$("#cerrar_menu_encabezado").hide();

  }
  public recarga_carrito()
  {

    this.c_c.consultaCarrito();

  }
  public fn_cerrar_session()
  {


	//solo generamos un nuevo token cuando el usuario este logueado.
	  if(localStorage.getItem("esta_logueado")=="1")
	  {

		this.session.fn_kill_session();
		this.logueado=false;
		window.location.reload();

	  }

  }

  public fn_funciones_jquery()
  {
	  $(document).ready(
		function()
		{
			$("#btn_login").click(
				function()
				{
					//alert(localStorage.getItem("esta_logueado"));
					if (localStorage.getItem("esta_logueado")=="1")
					{
						//this.router.navigate(['cliente/panel-control']);

					}
					else
					{
						$(".cls_login_id").show();
					}


				}
			);
			$("#btn_login").hover(
				function()
				{
					if (localStorage.getItem("esta_logueado")=="1")
					{
						//this.router.navigate(['cliente/panel-control']);

					}
					else
					{

						$("#btn_login>div").hide();
					}
				}
			);
		}
	  );
  }
  public fn_aceptar_msj()
	{
		this.mostrar=false;
	}

  fn_guarda_e_mail_notificacion()
  {
  	this.cargando=true;
		this.dbs.fn_guarda_e_mail_notificacion(this.e_mail)
		.subscribe(
			data=>
			{
				this.msj=data[0].msj;
				this.mostrar=true;
				this.e_mail="";
				this.cargando=false;
			}

		);


  }



}
