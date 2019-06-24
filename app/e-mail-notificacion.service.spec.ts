import { TestBed } from '@angular/core/testing';

import { EMailNotificacionService } from './e-mail-notificacion.service';

describe('EMailNotificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EMailNotificacionService = TestBed.get(EMailNotificacionService);
    expect(service).toBeTruthy();
  });
});
