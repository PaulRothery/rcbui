import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHopComponent } from './recipe-hop.component';

describe('RecipeHopComponent', () => {
  let component: RecipeHopComponent;
  let fixture: ComponentFixture<RecipeHopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeHopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
