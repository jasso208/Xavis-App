import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaClientesComponent } from './alta-clientes/alta-clientes.component';
import { Cliente} from './clientes.model';
import { MunicipioService } from './../catalogos/municipio.service';
import { EstadoService } from './../catalogos/estado.service';
import { PaisService } from './../catalogos/pais.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule ,FormGroup,FormControl } from '@angular/forms';
import { RegistraClientesComponent } from './registra-clientes/registra-clientes.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ConfirmaInformacionComponent } from './confirma-informacion/confirma-informacion.component';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPayPalModule
	],
  providers:[
  
		MunicipioService,
		
		EstadoService,
		
		PaisService
		
	],
  declarations:   [
		AltaClientesComponent,
		LoginComponent,
		RegistraClientesComponent,
		PanelControlComponent,
		FormasPagoComponent,
		ConfirmaInformacionComponent
	],
	exports:[
	
		AltaClientesComponent,		
		LoginComponent,
		RegistraClientesComponent
	]
})
export class ClientesModule { }
