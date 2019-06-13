import { TestBed } from '@angular/core/testing';

import { ContProductosCarritoService } from './cont-productos-carrito.service';

describe('ContProductosCarritoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContProductosCarritoService = TestBed.get(ContProductosCarritoService);
    expect(service).toBeTruthy();
  });
});
