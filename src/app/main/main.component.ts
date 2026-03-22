import { Component } from '@angular/core';
import { ControlStockComponent } from '../control-stock/control-stock.component';

@Component({
  selector: 'app-main',
  imports: [ControlStockComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
