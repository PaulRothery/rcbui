import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGrainComponent } from './recipe-grain.component';

describe('RecipeGrainComponent', () => {
  let component: RecipeGrainComponent;
  let fixture: ComponentFixture<RecipeGrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeGrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeGrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
