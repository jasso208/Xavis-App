
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { RegistraClienteService } from './../registra-cliente.service';

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
	
	public calle_reg_cliente:string;
	public numero_interior_reg_cliente:string;
	public numero_exterior_reg_cliente:string;
	public cp_reg_cliente:string;
	public municipio_reg_cliente:string;
	public estado_reg_cliente:string;
	public pais_reg_cliente:string;
	public referencia_reg_cliente:string;

	registra_cliente:FormGroup;
  constructor( private rc:RegistraClienteService) { }

  ngOnInit() {
	  this.fn_inicia_form();
	  
  }
  fn_inicia_form()
  {
	  this.registra_cliente=new FormGroup(
			{
				
				nombre_reg_cliente:new FormControl('',[Validators.required]),
				apellido_p_reg_cliente:new FormControl('',[Validators.required]),
				apellido_m_reg_cliente:new FormControl(''),
				telefono_reg_cliente:new FormControl('',[Validators.required]),
				e_mail_reg_cliente:new FormControl('',[Validators.required]),
				rfc_reg_cliente:new FormControl(''),
				calle_reg_cliente:new FormControl('',[Validators.required]),
				numero_interior_reg_cliente:new FormControl(''),
				numero_exterior_reg_cliente:new FormControl('',[Validators.required]),
				cp_reg_cliente:new FormControl('',[Validators.required]),
				municipio_reg_cliente:new FormControl('',[Validators.required]),
				estado_reg_cliente:new FormControl('',[Validators.required]),
				pais_reg_cliente:new FormControl('',[Validators.required]),
				referencia_reg_cliente:new FormControl(''),
				psw_reg_cliente:new FormControl('',[Validators.required])
				
			}
		);
  }
  fn_registra_cliente()
  {
	  this.rc.fn_registra_cliente(this.registra_cliente)
			.subscribe(
				data=>
					{		
						if (data[0].estatus=="1")
						{
							alert("Su registro se realizo con exito");
							this.fn_inicia_form();
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
