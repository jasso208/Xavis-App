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

  public payPalConfig?: IPayPalConfig;
  public showSuccess:boolean;
  public showCancel:boolean;
  public showError2:boolean;
  public subtotal_aux:number=0;
    public subtotal:number=0;
    public iva_aux:number=0;
    public iva:number=0;
    public envio:number=0;
    public total_aux:number=0;
    public total:number=0;
  constructor(private car_service:CarritoComprasService,private r: Router,private gvs:GuardaVentaService,private det:DireccionEnvioTemporalService) { }
	ngOnInit() {	
				  this.initConfig();
			
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
	
	

  fn_regresar()
  {    
    this.r.navigate(['/confirma-informacion']);
  }
   
}
