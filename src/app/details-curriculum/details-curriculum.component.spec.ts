import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCurriculumComponent } from './details-curriculum.component';

describe('DetailsCurriculumComponent', () => {
  let component: DetailsCurriculumComponent;
  let fixture: ComponentFixture<DetailsCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCurriculumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
