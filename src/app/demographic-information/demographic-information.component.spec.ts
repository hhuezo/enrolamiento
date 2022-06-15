import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicInformationComponent } from './demographic-information.component';

describe('DemographicInformationComponent', () => {
  let component: DemographicInformationComponent;
  let fixture: ComponentFixture<DemographicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
