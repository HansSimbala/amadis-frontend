import { Component, OnInit } from '@angular/core';
import { CreateContractComponent } from './../create-contract/create-contract.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  createContract() {
    this.matDialog.open(CreateContractComponent);
  }

  ngOnInit(): void {
  }

}
