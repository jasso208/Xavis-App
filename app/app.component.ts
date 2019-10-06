import { Component,OnInit,HostBinding } from '@angular/core';
import {SessionService} from './session.service';
import { ContProductosCarritoService } from './cont-productos-carrito.service';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import { MuestraLoginService } from './muestra-login.service';
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
  public mostrar_buscar:boolean=false;
	public nombre_empresa:string="";
	public btn_login_txt:string="Entrar";
	public btn_salir_txt:string="";
	public e_mail:string="";
  public mostrar_confirma_salir:boolean;
	public esta_logueado:number=0;
	public usuario_logueado:string="";
	public cargando:boolean;
	//@HostBinding('class.is-open');
	public cont_prod:string;
  public muestra_reg_notif:boolean;
  public mostrar_menu_nav:boolean;
  public mostrar_msj_temporal:boolean;
  public msj_temporal:string;
	constructor(private car_service:CarritoComprasService,private dbs:EMailNotificacionService,private router:Router,private vul:ValidaUsrLogueadoService,private session:SessionService,private cont_prod_carrito:ContProductosCarritoService,private c_c:CarritoComprasComponent,private m_l:MuestraLoginService)
	{}
	ngOnInit()
	{

    if (sessionStorage.getItem("primera_vez")==null)
    {
      this.muestra_reg_notif=true;
    }
    sessionStorage.setItem("primera_vez","1")
    this.msj_temporal="";
    this.mostrar_msj_temporal=false;
    this.mostrar_confirma_salir=false;
    this.mostrar_menu_nav=false;
		this.cont_prod_carrito.change.subscribe(cont_prod=>{this.cont_prod=cont_prod});
	 	this.cargando=true;
		this.fn_funciones_jquery();
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
          if (localStorage.getItem("iniciar_session")=="1")
          {

            localStorage.setItem("iniciar_session","0");
            window.location.href="./#/alta_cliente";
          }
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
  fn_muestra_reg_notificaciones()
  {
    this.muestra_reg_notif=true;
  }
  fn_oculta_reg_emergente()
  {
    this.muestra_reg_notif=false;
  }
  fn_mostrar_buscar()
   {
     this.mostrar_buscar=!this.mostrar_buscar;
   }
  fn_menu_navegacion()
  {
    this.mostrar_menu_nav=!this.mostrar_menu_nav;
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
  public fn_continar_session_abierta()
  {
    this.mostrar_confirma_salir=false;
  }

  public fn_confirma_cerrar_session()
  {

    		this.session.fn_kill_session()
        .subscribe(
          data=>{
            this.logueado=false;
            localStorage.setItem("esta_logueado","0");
            localStorage.setItem("nueva_direccion","0");
            window.location.reload();
          }

        );

  }
  public fn_cerrar_session()
  {
    this.mostrar_confirma_salir=true;
    console.log("entro");
  }

  private fn_muestra_login()
  {
    this.m_l.fn_login(true);
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

				this.e_mail="";
				this.cargando=false;
        this.muestra_reg_notif=false;

        this.msj_temporal=data[0].msj;
        this.mostrar_msj_temporal=true;
        setInterval(
          ()=>{this.fn_oculta_msj()},3000

        );
			}

		);


  }


  fn_oculta_msj()
  {
    this.msj_temporal="";
    this.mostrar_msj_temporal=false;
    clearInterval();
  }
}
