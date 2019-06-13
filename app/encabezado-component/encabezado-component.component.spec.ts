import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoComponentComponent } from './encabezado-component.component';

describe('EncabezadoComponentComponent', () => {
  let component: EncabezadoComponentComponent;
  let fixture: ComponentFixture<EncabezadoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncabezadoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
