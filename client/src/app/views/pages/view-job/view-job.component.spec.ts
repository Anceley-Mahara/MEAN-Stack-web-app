import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobComponent } from './view-job.component';

describe('ViewJobComponent', () => {
  let component: ViewJobComponent;
  let fixture: ComponentFixture<ViewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
