import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraClientesComponent } from './registra-clientes.component';

describe('RegistraClientesComponent', () => {
  let component: RegistraClientesComponent;
  let fixture: ComponentFixture<RegistraClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
