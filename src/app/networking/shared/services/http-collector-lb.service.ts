import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';

@Injectable()
export class HttpCollectorLbService {

  private loabBalancers = ["http-collector-lb-backend-service"];
  public instanceGroups = [
    {groupName: "http-collector-asia", region:'Asia', code: 'asia', servers: ['central-1','central-2','central-3', 'east-2','east-1']},
    {groupName: "http-collector-europe",region:'Europe', code: 'eu', servers: ['central', 'west']},
    {groupName: "http-collector-North America",region:'North America', code: 'us-central', servers: ['central', 'west']}
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
    let dataGroupServers = [];
    let timeInterval = 10 * 100000; //Every 10 seconds
    let xAxis = [] ;

    // We fill the X-axis
    for (let i = fromDate.getTime(); i < now; i += timeInterval) {
      xAxis.push(i);
    }

    // For each server we fill fake Y points
    for (let group in this.instanceGroups) {

      let dataGroupServer = {
        groupName:this.instanceGroups[group].groupName,
        region:this.instanceGroups[group].region,
        totalInBound: 0,
        servers:[]
      }

      for (let server of this.instanceGroups[group]['servers']) {

        let dataServer = {
          serverName: server,
          groupName:dataGroupServer.groupName,
          lastRate:0,
          cpu:Math.floor(Math.random() * 100),
          numInstances:Math.floor(Math.random() * 5) ,
          data: []};

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

        // Update Total Inbound
        let lastRate = dataServer.data[dataServer.data.length - 1][1];
        dataGroupServer.totalInBound += lastRate;

        dataServer.lastRate = lastRate;

        dataGroupServer.servers.push(dataServer);
      }

      // We set the proportion of traffic to this server on group
      dataGroupServer.servers.forEach(server=>{
        server.trafficProportion = (server.lastRate / dataGroupServer.totalInBound);
      });

      dataGroupServers.push(dataGroupServer);

    }

    // We set the proportion of traffic to this group on every groups
    let totalTraffic = dataGroupServers.reduce((memo, group)=>(memo+group.totalInBound),0);
    dataGroupServers.forEach(group=>{
      group.trafficProportion = (group.totalInBound / totalTraffic);
    });


    return dataGroupServers;
  }

}


