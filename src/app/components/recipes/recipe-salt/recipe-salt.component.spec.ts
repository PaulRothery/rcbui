import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSaltComponent } from './recipe-salt.component';

describe('RecipeSaltComponent', () => {
  let component: RecipeSaltComponent;
  let fixture: ComponentFixture<RecipeSaltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSaltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSaltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
