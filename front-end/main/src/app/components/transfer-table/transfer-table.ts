import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { signal } from '@angular/core';

@Component({
  selector: 'app-transfer-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './transfer-table.html',
  styleUrl: './transfer-table.scss'
})
export class TransferTableComponent implements OnInit {
  private http = inject(HttpClient);
  transfers = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/transfers').subscribe({
      next: (data) => {
        this.transfers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  formatBlock(hex: string): number {
    return parseInt(hex, 16);
  }
}
