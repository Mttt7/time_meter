import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPreviewComponent } from './goal-preview.component';

describe('GoalPreviewComponent', () => {
  let component: GoalPreviewComponent;
  let fixture: ComponentFixture<GoalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
