import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesModule } from './clientes/clientes.module';
import { FormsModule, ReactiveFormsModule ,FormGroup,FormControl } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppComponent } from './app.component';
import { EncabezadoComponentComponent } from './encabezado-component/encabezado-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AltaClientesComponent } from './clientes/alta-clientes/alta-clientes.component';
import { LoginComponent } from './clientes/login/login.component';
import { RegistraClientesComponent } from './clientes/registra-clientes/registra-clientes.component';
import { FormasPagoComponent } from './clientes/formas-pago/formas-pago.component';

import { DetalleComponent} from './producto/detalle/detalle.component';
import {CarritoComprasComponent} from './carrito-compras/carrito-compras.component';
import { ResultadoBusquedaComponent } from './producto/resultado-busqueda/resultado-busqueda.component';
import { DetalleService } from './producto/detalle.service';
import { SessionService } from './session.service';
import { ContProductosCarritoService } from './cont-productos-carrito.service';
import { HttpModule } from '@angular/http';
import { ComponenteDePasoComponent } from './componente-de-paso/componente-de-paso.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DetalleBlogComponent } from './detalle-blog/detalle-blog.component';

import { PanelControlComponent} from './clientes/panel-control/panel-control.component';

const rutas: Routes = [

	{ path: '', redirectTo: '/home',pathMatch:'full'},	
	{ path: 'home', component: HomeComponentComponent },
	{ path: 'alta_cliente', component: AltaClientesComponent },	
	{ path: 'producto/detalle/:id',component: DetalleComponent},
	{ path: 'blog',component: BlogsComponent},
	{ path: 'blog/detalle/:id_blog',component: DetalleBlogComponent},
	{ path: 'producto/resultado_busqueda/:tipo_busqueda/:param_1',component:ResultadoBusquedaComponent},
	{ path: 'cliente/panel-control',component: PanelControlComponent},
	{ path: 'formas-pago',component: FormasPagoComponent},
	
	//rutas de paso
	{ path:'de_paso_busqueda/:tipo_paso/:param_0/:param_1',component:ComponenteDePasoComponent },
	{ path:'de_paso_detalle_prod/:tipo_paso/:param_0',component:ComponenteDePasoComponent },
	{ path:'de_paso_detalle_blog/:tipo_paso/:param_0',component:ComponenteDePasoComponent }
	
];

@NgModule({
	
  declarations: [
		AppComponent,
		EncabezadoComponentComponent,
		HomeComponentComponent,
		DetalleComponent,
		CarritoComprasComponent,	
		ResultadoBusquedaComponent,
		ComponenteDePasoComponent,
		BusquedaComponent,
		BlogsComponent,
		DetalleBlogComponent

  ],
  
  imports: [
		BrowserModule,
		ClientesModule,
		RouterModule.forRoot(rutas, { useHash: true }),		
		HttpModule,		
		ReactiveFormsModule,
		FormsModule,
		NgxPayPalModule
  ],
  exports:[RouterModule],
  providers: [DetalleService,SessionService,ContProductosCarritoService,CarritoComprasComponent],
  bootstrap: [AppComponent]
  
})

export class AppModule { }

