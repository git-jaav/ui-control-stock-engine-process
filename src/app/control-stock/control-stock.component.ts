import { Component } from '@angular/core';

import { ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ControlStockService, StockItem } from '../_services/control-stock.service';

@Component({
  selector: 'app-control-stock',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlStockComponent {

  private stockService = inject(ControlStockService);

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  stock$ = this.refreshTrigger.pipe(
    switchMap(() => this.stockService.getStock())
  );

  refresh(): void {
    this.refreshTrigger.next();
  }

  trackById(index: number, item: StockItem): number {
    return item.id;
  }
}