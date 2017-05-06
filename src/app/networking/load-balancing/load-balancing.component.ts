import {Component, OnInit} from '@angular/core';
import {HttpCollectorLbService} from "../shared/services/http-collector-lb.service";
import * as moment from 'moment';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as d3 from "d3";

@Component({
  selector: 'app-charts',
  templateUrl: './load-balancing.component.html',
  styleUrls: ['./load-balancing.component.scss']
})
export class LoadBalancingComponent implements OnInit {
  groupServers: any[];

  public loadBalancers;
  public chartTimeForm: FormGroup;
  public timeOptions;
  public chartOptions;
  public chartData;
  public chartSeries;
  public lastOverTimeChart;
  private chart;
  private colors = ["#5cbae6","#b6d957","#fac364","#8cd3ff","#d998cb","#f2d249","#93b9c6","#ccc5a8","#52bacc","#dbdb46","#98aafb"];

  constructor(private formBuilder: FormBuilder,
              private httpCollectorLbService: HttpCollectorLbService) {

    this.loadBalancers = this.httpCollectorLbService.getLoadBalancers();
    this.chartTimeForm = this.formBuilder.group({
      time: 7 * 24
    });

    this.timeOptions = [
      {label: '1 hours', value: 1},
      {label: '6 hours', value: 6},
      {label: '12 hours', value: 12},
      {label: '1 day', value: 24},
      {label: '2 days', value: 2 * 24},
      {label: '4 days', value: 4 * 24},
      {label: '7 days', value: 7 * 24},
      {label: '14 days', value: 14 * 24},
      {label: '30 days', value: 30 * 24}];

    this.lastOverTimeChart = new Date();

    this.chartOptions = {
      chart: {
        type: 'lineChart',
        height: 300,
        duration:500,
        showLegend:false,
        key:(d) => d._id,
        tooltip:{
          enabled:false
        },
        x: (d) => d[0],
        y: (d) => d[1],
        showControls:false,
        xAxis: {
          tickFormat: (d) => d3.time.format('%b %d')(new Date(d))
        },
        lines:{
          dispatch: {
            elementMouseover:  (e)=>{
              e.series['lastMouseValue'] = e.point.y;
              this.lastOverTimeChart = new Date(e.point.x);
            }
          }
        },
        callback: (e) => {
          this.chart = e;
        }
      }
    };
  }

  ngOnInit() {

    this.chartTimeForm.valueChanges.subscribe(val=>{
      this.loadData(moment().subtract(val.time, 'hour').toDate())
    });

    // Init the default time value
    this.loadData(moment().subtract(this.chartTimeForm.controls.time.value, 'hour').toDate())

  }

  /**
   * Load data and set up the graph
   * @param fromDate
   */
  loadData(fromDate) {

    this.httpCollectorLbService.getRpsForBackend('test', fromDate).then((data) => {

      this.groupServers = data;
      //we add the colors to each servers
      let index = 0;
      this.groupServers.forEach((group,i)=>{
        group.servers.forEach((server,j)=>{
          server.color = this.colors[index %this.colors.length];
          index++
        })
      });

      let servers = [].concat.apply([],data.map(d=>d.servers));

      // If the chart is already initialized we should only change the data
      if(this.chartSeries){
        for(let index in this.chartSeries){
          this.chartSeries[index].values = servers[index].data;
        }
      }else{
        this.chartSeries = servers.map((d,i)=>{
          return {
            key:`${d.groupName} (${d.serverName})`,
            values:d.data,
            color: d.color,
            area:true,
            visible: i == 0,
            disabled: i != 0
          };
        });
      }

      // fix that nvd3 keep reference to passed object
      this.chartData = this.chartSeries.slice();
      console.log(this.chartData)
    });

  }

  /**
   * Update visible series
   */
  onCheckServerChange(){
    let oldState = this.chart.state;
    oldState.disabled = this.chartSeries.map(d=>!d.visible);
    this.chart.dispatch.changeState(oldState);

  }
}
