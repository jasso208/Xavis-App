import { Component, OnInit } from '@angular/core';
import { DetalleService } from './../detalle.service';
import { ActivatedRoute, Params } from '@angular/router';
import {CarritoComprasService} from './../carrito-compras.service';
import { ContProductosCarritoService } from './../../cont-productos-carrito.service';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
	public mostrar:boolean;
	public cargando:boolean;
  prod:any;

  rutaActiva:any;

  carrito:any;

  id_producto:number;

  id_talla:string="0";

  cantidad:number=1;

  productos:any={};

  descuento=false;

  precio_venta:string="0.00";

  precio_antes_descuento:string="0.00";

  nombre_producto="";

  img_principal:string="";

  show_error_reg:boolean;
  public msj:string="";
  public mostrar_msj:boolean;



  constructor( producto:DetalleService,private ruta: ActivatedRoute,private carrito_c:CarritoComprasService,private cont_prod_carrito:ContProductosCarritoService)
  {
      this.prod=producto;
      this.rutaActiva=ruta;
      this.carrito=carrito_c;
  }

  fn_resta_cantidad()
  {
      this.cantidad=this.cantidad-1;
      if (this.cantidad<0)
      {
        this.cantidad=0;
      }
  }
  fn_suma_cantidad()
  {

        this.cantidad=this.cantidad+1;
        //actualmente todos nuestros productos son unicos,
        //por lo tanto solo pueden tener 1 en el carrito de compras.
        if(this.cantidad>1)
        {
          this.cantidad=1;
        }

  }
  fn_oculta_msj()
  {
    this.mostrar_msj=false;
    clearInterval();
  }
  ngOnInit() {


    this.show_error_reg=false;
		this.cargando=true;
      this.mostrar_msj=false;
	   this.mostrar=false;
	   this.id_producto=this.rutaActiva.snapshot.params.id;
	    this.prod.getProductos(this.id_producto).subscribe(data=>{
      this.productos=data[0];
	  this.id_producto=data[0].id_producto;

		this.fn_genera_img_producto();
		this.fn_jquery();
      /*calculamos el descuento*/
      if (parseFloat(this.productos.descuento).toFixed(2)>parseFloat('0.00').toFixed(2))
      {
        this.descuento=true;//si tenemos descuento, mostrara el apartado de descuento.
        this.precio_venta=parseFloat((this.productos.precio-(this.productos.precio*(this.productos.descuento/100.00))).toString()).toFixed(2);
        this.precio_antes_descuento=parseFloat((this.productos.precio).toString()).toFixed(2);
      }


      else
      {
        this.precio_antes_descuento="0.00";
        this.descuento=false;
        this.precio_venta=parseFloat((this.productos.precio).toString()).toFixed(2);
      }
      this.cargando=false;
    }
    )

  }

  agregaProductoCarrito()
  {

		if (this.id_talla=="0")
		{


              //la funcion fn_muestra_error_boton esta en el index
             // fn_muestra_error_boton("id_talla_detalle_producto","Debe indicar una talla");
			          this.msj="Debe indicar una talla";
             //alert("Debe indicar una talla");

                 this.show_error_reg=true;
			return 0
    }

    if(this.cantidad<=0)
    {
        //la funcion fn_muestra_error_boton esta en el index
        //fn_muestra_error_boton("cantidad_detalle_producto","Debe indicar una cantidad valida");
        //alert("Debe indicar una cantidad valida");
		      this.msj="Debe indicar una cantidad valida";
          this.show_error_reg=true;
          return 0;
    }
		if(this.id_producto==0)
		{
			//alert("No se pudo agregar el producto, intente refrescando la pagina");
			   this.msj="No se pudo agregar el producto, intente refrescando la pagina";
          this.show_error_reg=true;
			      return 0;
		}

    this.cargando=true;
	  this.carrito.insertaCarrito((this.id_producto).toString(),(this.cantidad).toString(),(this.id_talla).toString()).subscribe
	  (
		data=>
		{
				//si tiene el estatus 0 es porque fallo.
				if (data[0].estatus==0)
				{
            this.show_error_reg=true;
						//alert(data[0].msj);
						this.cargando=false;
						this.msj=data[0].msj;
				}
				else
				{
					this.cargando=false;
					this.id_talla="0";
					this.cantidad=0;
					//alert("El producto se agrego correctamente");
          this.mostrar_msj=true;
          setInterval(()=>{
                 this.fn_oculta_msj(); },3000);

          this.cont_prod_carrito.fn_cont_prod_carrito()
            .subscribe(
              data=>
              {
                this.cont_prod_carrito.fn_establece_cont(data[0].cantidad__sum);
                //this.c_c.fn_actualiza_cantidad_carrito(data[0].cantidad__sum);
              }
            ) ;
              this.show_error_reg=false;
					    window["angularComponentReference"].componentFn();

				}


		}
	  );

  }

  public fn_genera_img_producto()
  {


	  if (String(this.id_producto).length==1)
	  {
		    this.img_principal="000000"+String(this.id_producto);
	  }
	  if (String(this.id_producto).length==2)
	  {
		    this.img_principal="00000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==3)
	  {
		    this.img_principal="0000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==4)
	  {
		    this.img_principal="000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==5)
	  {
		    this.img_principal="00"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==6)
	  {
		    this.img_principal="0"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==7)
	  {
		    this.img_principal=String(this.id_producto);
	  }
  }
	public fn_jquery()
	{
		$(document).ready(
			function()
			{
				$(".cls_boton_img_galeria").click(
					function()
					{
						//alert("gunciona");
						var nueva_img=$(this).attr("src");

						$("#img_mostrar>img").attr("src",nueva_img);
					}
				);
			}
		);
	}


}
