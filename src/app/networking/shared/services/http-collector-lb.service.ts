import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';

@Injectable()
export class HttpCollectorLbService {

  private loabBalancers = ["http-collector-lb-backend-service"];
  public instanceGroups = [
    {groupName: "http-collector-asia", code: 'asia', servers: ['central', 'east']},
    {groupName: "http-collector-europe", code: 'eu', servers: ['central', 'west']},
    {groupName: "http-collector-North America", code: 'us-central', servers: ['central', 'west']}
  ];

  constructor() {
  }

  getLoadBalancers() {
    return Promise.resolve(this.loabBalancers);
  }

  getRpsForBackend(backendId: string, fromDate: Date) {
    let result = this.getFackeRps(fromDate);
    return Promise.resolve(result);
  }


  private getFackeRps(fromDate: Date) {
    let now = new Date().getTime();
    let dataServers = [];
    let timeInterval = 10 * 100000; //Every 10 seconds
    let xAxis = [] ;

    // We fill the X-axis
    for (let i = fromDate.getTime(); i < now; i += timeInterval) {
      xAxis.push(i);
    }

    // For each server we fill fake Y points
    for (let group in this.instanceGroups) {
      for (let server of this.instanceGroups[group]['servers']) {

        let dataServer = {serverName: server, groupName: this.instanceGroups[group].groupName, data: []};

        // We choose the first number to get a better curve
        dataServer.data.push([xAxis[0], Math.floor(Math.random() * 10000) ]);

        for (let i = 1; i < xAxis.length; i += 1) {
          let lastPoint, sign, newPoint;

          lastPoint = dataServer.data[dataServer.data.length - 1][1];
          sign = Math.random() < 0.5 ? -1 : 1;

          // We add +- a random number between 0-500
          newPoint = lastPoint + (sign * Math.floor(Math.random() * 500));

          // The point should be always positive
          newPoint = newPoint < 0 ? -newPoint: newPoint;

          dataServer.data.push([xAxis[i],newPoint])
        }

        dataServers.push(dataServer);
      }

    }


    return dataServers;
  }

}


