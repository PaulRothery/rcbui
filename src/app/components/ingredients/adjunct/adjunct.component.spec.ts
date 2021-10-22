import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjunctComponent } from './adjunct.component';

describe('AdjunctComponent', () => {
  let component: AdjunctComponent;
  let fixture: ComponentFixture<AdjunctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjunctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjunctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
