import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaInformacionComponent } from './confirma-informacion.component';

describe('ConfirmaInformacionComponent', () => {
  let component: ConfirmaInformacionComponent;
  let fixture: ComponentFixture<ConfirmaInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
