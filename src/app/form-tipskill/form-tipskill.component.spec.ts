import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipskillComponent } from './form-tipskill.component';

describe('FormTipskillComponent', () => {
  let component: FormTipskillComponent;
  let fixture: ComponentFixture<FormTipskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTipskillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTipskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
