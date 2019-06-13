import { TestBed } from '@angular/core/testing';

import { VarGlobalesService } from './var-globales.service';

describe('VarGlobalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VarGlobalesService = TestBed.get(VarGlobalesService);
    expect(service).toBeTruthy();
  });
});
