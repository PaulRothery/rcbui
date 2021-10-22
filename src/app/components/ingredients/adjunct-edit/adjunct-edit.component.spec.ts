import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjunctEditComponent } from './adjunct-edit.component';

describe('AdjunctEditComponent', () => {
  let component: AdjunctEditComponent;
  let fixture: ComponentFixture<AdjunctEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjunctEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjunctEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
