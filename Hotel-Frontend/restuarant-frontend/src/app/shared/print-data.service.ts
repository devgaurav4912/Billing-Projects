import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintDataService {

  constructor() { }

  private printData : any

  setData(data: any) {
    this.printData = data;
  }

  getData() {
    return this.printData;
  }
}
