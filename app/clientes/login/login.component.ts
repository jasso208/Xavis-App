import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	public e_mail_login:string;
	public psw_login:string;
	public mostrar:boolean;	
	public msj:string="";
	
	login:FormGroup;
	
	constructor(private ls:LoginService) { }

	ngOnInit() {
	  this.login=new FormGroup(
			{
				
				e_mail_login:new FormControl('',[Validators.required]),
				
				psw_login:new FormControl('',[Validators.required])
				
			}
		);
		this.mostrar=false;
	}
	
	fn_login()
	{
		this.ls.fn_login(this.login)
			.subscribe(
				data=>
					{		
						if (data[0].estatus=="1")
						{
							//alert("Logueado correctamente");
							this.msj="Bienvenido"
							this.mostrar=true;							
							
							window.location.reload();
							
						}
						else
						{
							this.msj=data[0].msj;
							//alert(data[0].msj);
							this.mostrar=true;							
							
						}
					}
				);	  
	}
  
	public fn_aceptar_msj()
	{
		this.mostrar=false;
	}

}
