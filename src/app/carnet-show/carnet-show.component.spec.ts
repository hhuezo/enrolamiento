import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetShowComponent } from './carnet-show.component';

describe('CarnetShowComponent', () => {
  let component: CarnetShowComponent;
  let fixture: ComponentFixture<CarnetShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarnetShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
