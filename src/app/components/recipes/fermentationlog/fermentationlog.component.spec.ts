import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentationlogComponent } from './fermentationlog.component';

describe('FermentationlogComponent', () => {
  let component: FermentationlogComponent;
  let fixture: ComponentFixture<FermentationlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FermentationlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FermentationlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
