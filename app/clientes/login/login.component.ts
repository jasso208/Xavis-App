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

	login:FormGroup;
	constructor(private ls:LoginService) { }

	ngOnInit() {
	  this.login=new FormGroup(
			{
				
				e_mail_login:new FormControl('',[Validators.required]),
				psw_login:new FormControl('',[Validators.required])
				
			}
		);
	}
	
	fn_login()
	{
		this.ls.fn_login(this.login)
			.subscribe(
				data=>
					{		
						if (data[0].estatus=="1")
						{
							alert("Logueado correctamente");
							window.location.reload();
							
						}
						else
						{
							alert(data[0].msj);
						}
					}
				);	  
	}
  


}
