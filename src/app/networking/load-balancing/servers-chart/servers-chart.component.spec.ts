import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersChartComponent } from './servers-chart.component';

describe('ServersChartComponent', () => {
  let component: ServersChartComponent;
  let fixture: ComponentFixture<ServersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
