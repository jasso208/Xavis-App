import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaPswComponent } from './recupera-psw.component';

describe('RecuperaPswComponent', () => {
  let component: RecuperaPswComponent;
  let fixture: ComponentFixture<RecuperaPswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperaPswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperaPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
