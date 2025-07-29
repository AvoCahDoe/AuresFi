import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransferTableComponent } from './components/transfer-table/transfer-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TransferTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('main');
}
