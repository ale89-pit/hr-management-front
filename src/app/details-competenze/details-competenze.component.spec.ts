import { ComponentFixture, TestBed } from '@angular/core/testing';
import{DetailsCompetenzeComponent} from './details-competenze.component';

describe('DetailsTipskillComponent', () => {
  let component: DetailsCompetenzeComponent;
  let fixture: ComponentFixture<DetailsCompetenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCompetenzeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsCompetenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
