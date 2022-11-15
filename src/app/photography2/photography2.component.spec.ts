import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photography2Component } from './photography2.component';

describe('Photography2Component', () => {
  let component: Photography2Component;
  let fixture: ComponentFixture<Photography2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Photography2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Photography2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
