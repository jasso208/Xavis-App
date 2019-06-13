import { Component, OnInit } from '@angular/core';
import { DireccionEnvioTemporalService } from './../direccion-envio-temporal.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { GuardaVentaService } from './../guarda-venta.service';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import {CarritoComprasService} from './../../producto/carrito-compras.service';
@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.css']
})
export class FormasPagoComponent implements OnInit {
	public mostrar:boolean;
	public payPalConfig?: IPayPalConfig;
	public showSuccess:boolean;
	public showCancel:boolean;
	public showError2:boolean;
	public productos:any[]=[{}];
	public subtotal_aux:number=0;
    public subtotal:number=0;
    public iva_aux:number=0;
    public iva:number=0;
    public envio:number=0;
    public total_aux:number=0;
    public total:number=0;
	  cont_productos:number=0;
  constructor(private car_service:CarritoComprasService,private r: Router,private gvs:GuardaVentaService,private det:DireccionEnvioTemporalService) { }
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
	cliente:FormGroup;
	ngOnInit() {	
			//para mostrar o ocultar el div hover
			this.mostrar=false;
			
			this.initConfig();
			this.consultaCarrito();
			this.cliente=new FormGroup(
					{
						nombre:new FormControl(this.nombre,[Validators.required]),
						apellido_p:new FormControl(this.apellido_p,[Validators.required]),
						apellido_m:new FormControl(this.apellido_m,[Validators.required]),
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
					
			//como ya solo se va a confirmar la venta, no consultamos la informacion
			//de la cuenta, si no la confirmo en el paso anterior.
			this.det.fn_direccion_envio_temporal_get()
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
				this.cliente=new FormGroup(
					{
						nombre:new FormControl(this.nombre,[Validators.required]),
						apellido_p:new FormControl(this.apellido_p,[Validators.required]),
						apellido_m:new FormControl(this.apellido_m,[Validators.required]),
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
					}
				);

			}
			);	  
			
  }

  fn_guarda_venta()
  {
	//https://www.paypal.com/sdk/js?client-id=AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt&currency=MXN"
			
	  this.gvs.fn_inserta_venta()
	  .subscribe
	  (
		data=>
		{
			
				alert(data[0].msj);
				if (data[0].estatus=="1")
				{					
					this.r.navigate(['/']);
				}
			
		}
	  );
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  });
  }
  
 /* ngAfterViewInit(): void {
    this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
      paypal.Button.render({
        env: 'sandbox',
        client: {
          production: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
          sandbox: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt'
        },
        commit: true,
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: '1.00', currency: 'MXN' }
                }
              ]
            }
          })
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            // TODO
          })
        }
      }, '#paypal-button-container');
    });
  }
  
*/
private initConfig(): void {
      this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: String(this.total),
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: String(this.total)
                }
              }
            }/*,
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: '9.99',
                },
              }
            ]*/
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
		  this.fn_guarda_venta();
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
    }
  private initConfig2(): void {
        this.payPalConfig = {
            currency: 'MXN',
            clientId: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: String(this.total),
                        breakdown: {
                            item_total: {
                                currency_code: 'MXN',
                                value: String(this.subtotal)
                            }
                        }
                    }/*,
                    items: [{
                        name: 'Un Producto',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'MXN',
                            value: this.subtotal,
                        },
                    }]*/
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
					this.fn_guarda_venta();
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;

            },
            onError: err => {
                console.log('OnError', err);
                this.showError2 = true;
            },
            onClick: () => {
                console.log('onClick');
                this.showSuccess = false;
				 this.showCancel = false;
				  this.showError2 = false;
            },
        };
    }
	
	
	

    public consultaCarrito()
  {	  
	
    this.car_service.consultaCarrito()
    .subscribe(data=>{
		
		this.productos=data;
			this.cont_productos=this.productos.length;
		var x=0;		
		this.subtotal_aux=0;
		
		for(x=0;x<this.productos.length;x++)
		{
			this.subtotal_aux=this.subtotal_aux+this.productos[x].precio*this.productos[x].cantidad;
		}		
		
		//this.subtotal_aux=this.subtotal_aux;
		//this.iva_aux=this.subtotal_aux/0.16;
		//this.total_aux=this.subtotal_aux+this.iva_aux+this.envio;
		
		this.total=(this.subtotal_aux);
		this.subtotal=((this.subtotal_aux/1.16));
		this.iva=((this.total-this.subtotal));
	
    });
  }
  
}
