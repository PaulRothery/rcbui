import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdjunctComponent } from './recipe-adjunct.component';

describe('RecipeAdjunctComponent', () => {
  let component: RecipeAdjunctComponent;
  let fixture: ComponentFixture<RecipeAdjunctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeAdjunctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAdjunctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
