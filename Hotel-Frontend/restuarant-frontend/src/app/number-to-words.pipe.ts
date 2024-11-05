import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  private units: string[] = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
  private teens: string[] = ['Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  private tens: string[] = ['','Ten','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  private thousands: string[] = ['','Thousand','Million','Billion'];

  transform(value: number): string {
    if (value === 0) return 'Zero';
    return this.convertToWords(value);
  }

  private convertToWords(num: number): string {
    if (num === 0) return '';
    else if (num < 10) return this.units[num];
    else if (num < 20) return this.teens[num - 11];
    else if (num < 100) return this.tens[Math.floor(num / 10)] + (num % 10 > 0 ? ' ' + this.units[num % 10] : '');
    else if (num < 1000) return this.units[Math.floor(num / 100)] + ' Hundred ' + this.convertToWords(num % 100);
    else {
      let i = 0;
      let words = '';
      while (num > 0) {
        if (num % 1000 !== 0) {
          words = this.convertToWords(num % 1000) + ' ' + this.thousands[i] + ' ' + words;
        }
        num = Math.floor(num / 1000);
        i++;
      }
      return words.trim();
    }
  }
}
