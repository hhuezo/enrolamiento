import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sign1Component } from './sign1.component';

describe('Sign1Component', () => {
  let component: Sign1Component;
  let fixture: ComponentFixture<Sign1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sign1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sign1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
