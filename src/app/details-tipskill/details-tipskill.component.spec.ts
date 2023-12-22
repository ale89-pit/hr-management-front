import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTipskillComponent } from './details-tipskill.component';

describe('DetailsTipskillComponent', () => {
  let component: DetailsTipskillComponent;
  let fixture: ComponentFixture<DetailsTipskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTipskillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTipskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
