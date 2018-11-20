import { Component, OnInit } from '@angular/core';
import { HistoryLog } from 'src/app/shared/models/history-log';
import { HistoryService } from 'src/app/core/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  entries: HistoryLog[];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getHistory().subscribe( entries => {
      this.entries = entries;
    });
  }

}
