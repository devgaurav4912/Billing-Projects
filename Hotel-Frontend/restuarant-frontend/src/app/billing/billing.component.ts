import { Component, OnInit } from '@angular/core';
import { PrintDataService } from '../shared/print-data.service';
import { NgxPrintService } from 'ngx-print';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {

  printData : any;

  constructor(private printService : PrintDataService,
              private ngxPrint: NgxPrintService
  ){}

  ngOnInit(): void {

    const rawPrintData = this.printService.getData();

    if (rawPrintData) {
      try {
        this.printData = JSON.parse(rawPrintData);
        console.log("Parsed printData response ==> ", this.printData);
      } catch (error) {
        console.error("Error parsing printData JSON: ", error);
      }
    } else {
      console.error("No print data found.");
    }
  }

  printInvoice() {
    // const printSection = document.getElementById('print-section');
    // if (printSection) {
    //   const printWindow = window.open('', '', 'height=600,width=800');
    //   printWindow?.document.write('<html><head><title>Invoice</title>');
    //   printWindow?.document.write('</head><body >');
    //   printWindow?.document.write(printSection.innerHTML);
    //   printWindow?.document.write('</body></html>');
    //   printWindow?.document.close();
    //   printWindow?.focus();
    //   printWindow?.print();
    // }
    
    window.print()
  }

}
