import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-table',
  templateUrl: './billing-table.component.html',
  styleUrl: './billing-table.component.css'
})
export class BillingTableComponent {

  displayedColumns: string[] = ['select', 'code', 'description', 'quantity', 'price', 'total'];
  items = [
    { code: '1', description: '', quantity: 1, price: '', total: '0' },
    { code: '4', description: '', quantity: 1, price: '', total: '0' },
    { code: '5', description: '', quantity: 1, price: '', total: '0' },
  ];
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.items.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.items.forEach(row => this.selection.select(row));
  }

}
