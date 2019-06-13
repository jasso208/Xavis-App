import { TestBed } from '@angular/core/testing';

import { AgregaProdCarritoService } from './agrega-prod-carrito.service';

describe('AgregaProdCarritoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgregaProdCarritoService = TestBed.get(AgregaProdCarritoService);
    expect(service).toBeTruthy();
  });
});
