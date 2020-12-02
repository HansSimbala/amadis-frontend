import { Component } from '@angular/core';

import { permissions } from "./permissions";
import { roles } from "./roles";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  permissions = permissions;
  roles = roles;
  
  title = 'amadis-frontend';
}
