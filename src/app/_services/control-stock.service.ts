import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface StockItem {
  id: number;
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ControlStockService {

  getStock(): Observable<StockItem[]> {

    const data: StockItem[] = [
      { id: 1, name: 'Keyboard', quantity: 25 },
      { id: 2, name: 'Mouse', quantity: 40 },
      { id: 3, name: 'Monitor', quantity: 10 }
    ];

    return of(data);
  }
}