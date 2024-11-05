import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { ApiService } from '../../api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  Categorycount : any;
  productCount : any;
  customerCount : any;
  placeOrderCount : any;
  pieChartOptions: any;
  cartsList : any[] =[];

  constructor(public route: ActivatedRoute,
              private dataService : ShareDataService,
              private service : ApiService,
              private router: Router
  ) { 

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const cachedData = this.dataService.getMonthlySalesData();
      if (cachedData.length === 0) {
        this.getAllCarts();
      } else {
        this.setPieChartData(cachedData);
      }
    });
  }

ngOnInit(): void {

  
 
  this.getAllCarts();

  this.Categorycount = this.dataService.getCategoryCount();
  this.productCount = this.dataService.getProductCount();
  this.customerCount = this.dataService.getCustomerCount();
  this.placeOrderCount = this.dataService.getPlaceOrderCount();

  this.pieChartOptions = {
    title: {
      text: 'Monthly Sales',
      subtext: 'Current Year',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Monthly Sales',
        type: 'pie',
        radius: '50%',
        data: [], // This will be filled by the getAllCarts() method
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };


  //   this.getAllCarts();

//    this.Categorycount = this.dataService.getCategoryCount();
//   console.log('Category Item count:', this.Categorycount);
//   console.log("category count --3--> "+ this.Categorycount)

//   this.productCount = this.dataService.getProductCount();
//   this.customerCount = this.dataService.getCustomerCount();
//   this.placeOrderCount = this.dataService.getPlaceOrderCount();

// //pie chart 

// this.pieChartOptions = {
//   title: {
//     text: 'Monthly Sales',
//     subtext: 'Current Year',
//     left: 'center'
//   },
//   tooltip: {
//     trigger: 'item'
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left'
//   },
//   series: [
//     {
//       name: 'may',
//       type: 'pie',
//       radius: '50%',
//       data: [
//         { value: 1048, name: 'Category 1' },
//         { value: 735, name: 'Category 2' },
//         { value: 580, name: 'Category 3' },
//         { value: 484, name: 'Category 4' },
//         { value: 300, name: 'Category 5' }
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       }
//     }
//   ]
// };
}


// getAllCarts(){
//   this.service.getAllCarts().subscribe((res:any)=>{
//     this.cartsList = res;
//     console.log("Carts response --> "+JSON.stringify(res));
//     this.cartsList.forEach((cart: any) => {
//       console.log("NET BILL for cart_id " + cart.cart_id + " --> " + cart.netBill);
//     });
//    // this.placeOrderCount = this.cartsList.length;
//     //this.shareService.setPlaceOrderCount(this.placeOrderCount);
//   })
// }

getAllCarts() {
  this.service.getAllCarts().subscribe((res: any) => {
    this.cartsList = res;

    // Initialize an object to hold the total netBill for each month
    const monthlySales: any = {};

    this.cartsList.forEach((cart: any) => {
      const date = new Date(cart.createdOn);
      const month = date.toLocaleString('default', { month: 'long' }); // e.g., "January", "February"

      if (!monthlySales[month]) {
        monthlySales[month] = 0;
      }

      monthlySales[month] += cart.netBill;
    });

    console.log("Monthly Sales --> ", monthlySales);

    // Prepare data for the pie chart
    this.pieChartOptions.series[0].data = Object.keys(monthlySales).map(month => {
      return { value: monthlySales[month], name: month };
    });

    console.log("Pie Chart Data --> ", this.pieChartOptions.series[0].data);

    const chartData = Object.keys(monthlySales).map(month => {
      return { value: monthlySales[month], name: month };
    });

    // Cache the data in the service
    this.dataService.setMonthlySalesData(chartData);

    // Update the chart
    this.setPieChartData(chartData);
    // this.placeOrderCount = this.cartsList.length;
    // this.shareService.setPlaceOrderCount(this.placeOrderCount);
  });
}

setPieChartData(data: any[]) {
  this.pieChartOptions = {
    title: {
      text: 'Monthly Sales',
      subtext: 'Current Year',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Monthly Sales',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}


}

  

