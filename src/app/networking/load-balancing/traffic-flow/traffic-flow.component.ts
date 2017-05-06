import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'loadbalancing-traffic-flow',
  templateUrl: './traffic-flow.component.html',
  styleUrls: ['./traffic-flow.component.css']
})
export class TrafficFlowComponent implements OnInit {

  @Input()
  public groupServer;

  public rowServerHeight= 75;
  public boxX = 500;
  public boxY= 1000;
  public widthStrokes;

  constructor() { }

  ngOnInit() {
    this.widthStrokes = 70*this.groupServer.trafficProportion;
  }

  getPathFor(i){
    let hMiddle = (this.groupServer.servers.length * this.rowServerHeight) /2;
    let strokeWidth = this.getStrokeWidth(this.groupServer.servers[i]);

    let rowHeightBox = this.boxY/this.groupServer.servers.length;

    let totalWidthStrokes = this.groupServer.servers.
    reduce((memo,server)=>{return memo+=this.getStrokeWidth(server) },0);

    let differenceY =  this.groupServer.servers.slice(i+1)
      .reduce((memo,server)=>{return memo+=this.getStrokeWidth(server) },0);

    let rowMiddle = i* rowHeightBox + rowHeightBox/2;
    return `M0 ${this.boxY /2 +(totalWidthStrokes/2)-differenceY } C450,${500  +(totalWidthStrokes/2)-differenceY } 400,${rowMiddle} 500,${rowMiddle}`
  }

  getStrokeWidth(server){
    return this.widthStrokes * server.trafficProportion;
  }

}
