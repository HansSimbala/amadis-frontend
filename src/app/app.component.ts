import { Component } from '@angular/core';

import { permissions } from "./permissions";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  permissions = permissions;
  
  title = 'amadis-frontend';
}
