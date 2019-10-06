import { TestBed } from '@angular/core/testing';

import { MuestraLoginService } from './muestra-login.service';

describe('MuestraLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuestraLoginService = TestBed.get(MuestraLoginService);
    expect(service).toBeTruthy();
  });
});
