import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDePasoComponent } from './componente-de-paso.component';

describe('ComponenteDePasoComponent', () => {
  let component: ComponenteDePasoComponent;
  let fixture: ComponentFixture<ComponenteDePasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteDePasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteDePasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
