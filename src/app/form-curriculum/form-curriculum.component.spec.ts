import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCurriculumComponent } from './form-curriculum.component';

describe('FormCurriculumComponent', () => {
  let component: FormCurriculumComponent;
  let fixture: ComponentFixture<FormCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCurriculumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
