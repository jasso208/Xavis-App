import { TestBed } from '@angular/core/testing';

import { CarritoComprasService } from './carrito-compras.service';

describe('CarritoComprasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarritoComprasService = TestBed.get(CarritoComprasService);
    expect(service).toBeTruthy();
  });
});
