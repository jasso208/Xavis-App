import { TestBed } from '@angular/core/testing';

import { BlogsServicesService } from './blogs-services.service';

describe('BlogsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogsServicesService = TestBed.get(BlogsServicesService);
    expect(service).toBeTruthy();
  });
});
