import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEmployeeComponent } from './card-employee.component';

describe('CardEmployeeComponent', () => {
  let component: CardEmployeeComponent;
  let fixture: ComponentFixture<CardEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
