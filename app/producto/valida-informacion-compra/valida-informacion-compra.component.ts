import { Component, OnInit } from '@angular/core';
import { CarritoComprasService } from './../carrito-compras.service';
@Component({
  selector: 'app-valida-informacion-compra',
  templateUrl: './valida-informacion-compra.component.html',
  styleUrls: ['./valida-informacion-compra.component.css']
})
export class ValidaInformacionCompraComponent implements OnInit {

  constructor(private carrito_compras:CarritoComprasService) { }

  ngOnInit() {
	  
  }

}
