
import { Component, OnInit ,HostBinding} from '@angular/core';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { RegistraClienteService } from './../registra-cliente.service';

import { MuestraLoginService } from './../../muestra-login.service';
import { MuestraRegistraClienteService } from './../../muestra-registra-cliente.service';

@Component({
  selector: 'app-registra-clientes',
  templateUrl: './registra-clientes.component.html',
  styleUrls: ['./registra-clientes.component.css']
})
export class RegistraClientesComponent implements OnInit {
	public nombre_reg_cliente:string;
	public apellido_p_reg_cliente:string;
	public apellido_m_reg_cliente:string;
	public telefono_reg_cliente:string;
	public e_mail_reg_cliente:string;
	public rfc_reg_cliente:string;
	public mostrar:boolean;
	public estatus:boolean;
	public calle_reg_cliente:string;
	public numero_interior_reg_cliente:string;
	public numero_exterior_reg_cliente:string;
	public cp_reg_cliente:string;
	public municipio_reg_cliente:string;
	public estado_reg_cliente:string;
	public pais_reg_cliente:string;
	public referencia_reg_cliente:string;
	public psw_reg_cliente_conf:string;
	public psw_reg_cliente:string;
	public msj:string;
	registra_cliente:FormGroup;

	public cls_email_reg:string;
	public cls_psw_reg:string;
	public cls_psw_reg_conf:string;
	public show_error_reg:boolean;
	public show_email_reg:boolean;
	public show_psw_reg:boolean;
	public show_psw_reg_conf:boolean;
  public mostrar_nuevo_registro:boolean;


  constructor( private rc:RegistraClienteService,private m_l:MuestraLoginService,private m_r_c:MuestraRegistraClienteService) { }

  ngOnInit() {

      this.m_r_c.change.subscribe(mostrar_nuevo_registro=>{this.mostrar_nuevo_registro=mostrar_nuevo_registro});



  		this.mostrar=false;
	  	this.fn_inicia_form();

	  	this.fn_reinicia_styles();
  }
  fn_iniciar_session()
  {
    this.m_l.fn_login(true);
    this.m_r_c.fn_nuevo_registro(false);
  }
  fn_cerrar()
  {
    this.m_l.fn_login(false);
    this.m_r_c.fn_nuevo_registro(false);
  }
  fn_inicia_form()
  {
	  this.registra_cliente=new FormGroup(
			{

				e_mail_reg_cliente:new FormControl('',[Validators.required]),
				psw_reg_cliente:new FormControl('',[Validators.required]),
				psw_reg_cliente_conf:new FormControl('',[Validators.required])

			}
		);
  }

	fn_reinicia_styles()
	{
		this.cls_email_reg="form-control";
		this.show_email_reg=false;

		this.cls_psw_reg="form-control";
		this.show_psw_reg=false;

		this.cls_psw_reg_conf="form-control";
		this.show_psw_reg_conf=false;

		this.show_error_reg=false;
	}

  fn_registra_cliente()
  {
		this.fn_reinicia_styles();



  		var form_ok=0;

  		if(this.registra_cliente.value.e_mail_reg_cliente=="")
  		{
  			this.cls_email_reg="form-control error_form";
			this.show_email_reg=true;
			form_ok=1;
  		}

		if(this.registra_cliente.value.psw_reg_cliente=="")
  		{
  			this.cls_psw_reg="form-control error_form";
			this.show_psw_reg=true;
			form_ok=1;
  		}

		if(this.registra_cliente.value.psw_reg_cliente_conf=="")
  		{
  			this.cls_psw_reg_conf="form-control error_form";
			this.show_psw_reg_conf=true;
			form_ok=1;
  		}

  		if (this.registra_cliente.value.psw_reg_cliente_conf!=this.registra_cliente.value.psw_reg_cliente)
  		{

  			this.estatus=true;//lo ponemos en true cuando marco error y no recargaremos la pagina
			this.msj="El campo contraseña no coincide con la confirmacion de contraseña";
			this.show_error_reg=true;
			form_ok=1;

  		}
  		if (form_ok==1)
  		{
  			return 0;
  		}

	  	this.rc.fn_registra_cliente(this.registra_cliente)
			.subscribe(
				data=>
					{
						if (data[0].estatus=="1")
						{

							window.location.reload();
						}
						else
						{

							this.msj=data[0].msj;
							this.show_error_reg=true;
							form_ok=1;

						}
					}
			);
  }



}
