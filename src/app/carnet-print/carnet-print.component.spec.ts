import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetPrintComponent } from './carnet-print.component';

describe('CarnetPrintComponent', () => {
  let component: CarnetPrintComponent;
  let fixture: ComponentFixture<CarnetPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
