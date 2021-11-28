import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewdayComponent } from './brewday.component';

describe('BrewdayComponent', () => {
  let component: BrewdayComponent;
  let fixture: ComponentFixture<BrewdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
