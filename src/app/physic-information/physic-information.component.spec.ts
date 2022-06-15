import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicInformationComponent } from './physic-information.component';

describe('PhysicInformationComponent', () => {
  let component: PhysicInformationComponent;
  let fixture: ComponentFixture<PhysicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
