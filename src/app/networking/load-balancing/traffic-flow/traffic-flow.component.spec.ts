import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficFlowComponent } from './traffic-flow.component';

describe('TrafficFlowComponent', () => {
  let component: TrafficFlowComponent;
  let fixture: ComponentFixture<TrafficFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
