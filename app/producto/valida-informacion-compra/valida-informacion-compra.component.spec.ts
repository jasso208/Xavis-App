import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaInformacionCompraComponent } from './valida-informacion-compra.component';

describe('ValidaInformacionCompraComponent', () => {
  let component: ValidaInformacionCompraComponent;
  let fixture: ComponentFixture<ValidaInformacionCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidaInformacionCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidaInformacionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
