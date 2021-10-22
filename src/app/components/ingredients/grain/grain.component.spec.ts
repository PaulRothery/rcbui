import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainComponent } from './grain.component';

describe('GrainComponent', () => {
  let component: GrainComponent;
  let fixture: ComponentFixture<GrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
