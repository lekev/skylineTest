import {Component, OnInit} from '@angular/core';
import {HttpCollectorLbService} from "../shared/services/http-collector-lb.service";
import {ChartReadyEvent} from "ng2-google-charts";
import * as moment from 'moment';
import * as _ from 'underscore';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-charts',
  templateUrl: './load-balancing.component.html',
  styleUrls: ['./load-balancing.component.scss']
})
export class LoadBalancingComponent implements OnInit {

  public loadBalancers;
  public chartTimeForm: FormGroup;
  public timeOptions;
  public chartOptions;
  public serverNames;
  private chartRef;

  constructor(private formBuilder: FormBuilder,
              private httpCollectorLbService: HttpCollectorLbService) {
  }

  ngOnInit() {
    this.loadBalancers = this.httpCollectorLbService.getLoadBalancers();
    this.chartTimeForm = this.formBuilder.group({
      time: 7*24
    });
    this.timeOptions = [
      {label: '1 hours', value: 1},
      {label: '6 hours', value: 6},
      {label: '12 hours', value: 12},
      {label: '1 day', value: 24},
      {label: '2 days', value: 2*24},
      {label: '4 days', value: 4*24},
      {label: '7 days', value: 7*24},
      {label: '14 days', value: 14*24},
      {label: '30 days', value: 30*24}]
    this.loadData();
  }

  loadData() {

    this.httpCollectorLbService.getRpsForBackend('test', moment().subtract(2, 'day').toDate()).then((data) => {
      console.log(data);

      this.serverNames = this.httpCollectorLbService.getServersNames(data);
      // let servers = [data.]

      let columns = ['Time'].concat(this.httpCollectorLbService.getServersNames(data));

      let rows = this.httpCollectorLbService.getServersYPoints(data);
      this.chartOptions = {
        chartType: 'AreaChart',
        hAxis: {textPosition: 'in'}, vAxis: {textPosition: 'in'},
        dataTable: [columns].concat(rows),
        legend: {position: 'none'},
        options: {
          'title': 'Tasks',
          hAxis: {
            format: 'M/d/yy'
          }
        },
      };
    });

  }

  onChartReady(event: ChartReadyEvent) {

  }
}
