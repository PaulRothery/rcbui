import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewlogComponent } from './brewlog.component';

describe('BrewlogComponent', () => {
  let component: BrewlogComponent;
  let fixture: ComponentFixture<BrewlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
