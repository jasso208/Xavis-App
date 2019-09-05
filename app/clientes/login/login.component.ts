import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { LoginService } from './../login.service';
import { RegistraClienteService } from './../registra-cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	public e_mail_login:string;
	public psw_login:string;
	public mostrar:boolean;	
	public estatus:boolean;
	public msj:string="";
	
	login:FormGroup;
	registra_cliente:FormGroup;
	public psw_reg_cliente_conf:string;
	public psw_reg_cliente:string;
	public e_mail_reg_cliente:string;
	public cls_email_login:string;
	public mostrar_error_email_login:boolean;
	public cls_psw_login:string;
	public mostrar_error_psw_login:boolean;
	public mostrar_error_login:boolean;

	constructor(private ls:LoginService,private rc:RegistraClienteService) { }

	ngOnInit() 
	{

	  this.login=new FormGroup(
			{
				
				e_mail_login:new FormControl('',[Validators.required]),
				
				psw_login:new FormControl('',[Validators.required])
				
			}
		);

		this.registra_cliente=new FormGroup(
			{
				
				e_mail_reg_cliente:new FormControl('',[Validators.required]),
				psw_reg_cliente:new FormControl('',[Validators.required]),
				psw_reg_cliente_conf:new FormControl('',[Validators.required])
				
			}
		);
		this.mostrar=false;
		this.fn_inicia_form();	  

		this.fn_reinicia_styles();	


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


	fn_registra_cliente()
	{
			this.mostrar=true;
  
			if (this.registra_cliente.value.psw_reg_cliente_conf!=this.registra_cliente.value.psw_reg_cliente)
			{
  
				this.msj="El campo contraseña no coincide con la confirmacion de contraseña";
				this.estatus=true;//lo ponemos en true cuando marco error y no recargaremos la pagina
				return 0;
  
			}
	
			this.rc.fn_registra_cliente(this.registra_cliente)
			  .subscribe(
				  data=>
					  {		
						  if (data[0].estatus=="1")
						  {
							  this.estatus=false;//lo ponemos en false cuando se guardo con exito y hay que recargar la pagina
							  this.msj="Su registro se realizo con exito";
						  }
						  else
						  {
							  this.estatus=true;//lo ponemos en true cuando marco error y no recargaremos la pagina
							  this.msj=data[0].msj;
							  
						  }
					  }
			  );	  
	}
  
	fn_reinicia_styles()
	{
		this.cls_email_login="form-control";
		this.mostrar_error_email_login=false;

		this.cls_psw_login="form-control";		
		this.mostrar_error_psw_login=false;

		this.mostrar_error_login=false;
	}

	fn_login()
	{

		this.fn_reinicia_styles();	

		var form_ok=0;

		if (this.login.value.e_mail_login=="")
		{
			this.cls_email_login="form-control error_form";		
			this.mostrar_error_email_login=true;
			form_ok=1;
			
		}


		if (this.login.value.psw_login=="")
		{
			this.cls_psw_login="form-control error_form";		
			this.mostrar_error_psw_login=true;
			form_ok=1;
					
		}

		if (form_ok==1)
		{
			return 0;
		}
		
		
		this.ls.fn_login(this.login)
			.subscribe(
				data=>
					{		
						if (data[0].estatus=="1")
						{						
							this.msj="Bienvenido";													
							
							window.location.reload();
							
						}
						else
						{
							this.msj=data[0].msj;
							this.mostrar_error_login=true;
							
							
						}
					}
				);	  
	}

	public fn_aceptar_msj()
	{
		
		console.log(this.estatus);
			if(!this.estatus)
			{
				this.fn_inicia_form();
				//this.registra_cliente.value.e_mail_reg_cliente="";
				//this.registra_cliente.value.psw_reg_cliente="";
				//this.registra_cliente.value.psw_reg_cliente_conf="";
				
			  	window.location.reload();
			}		
			this.mostrar=false;
		this.mostrar=false;
	}

}
