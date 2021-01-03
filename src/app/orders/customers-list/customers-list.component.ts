import { Component, OnInit } from '@angular/core';

export interface Section {
  customerId: number;
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  folders: Section[] = [
    {
      customerId: 1,
      name: 'Carlos',
      lastName: 'Trantow'
    },
    {
      customerId: 2,
      name: 'Jose',
      lastName: 'Trantow'
    },
    {
      customerId: 3,
      name: 'John',
      lastName: 'Trantow'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
