import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeBrewerComponent } from './recipe-brewer.component';

describe('RecipeBrewerComponent', () => {
  let component: RecipeBrewerComponent;
  let fixture: ComponentFixture<RecipeBrewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeBrewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeBrewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
