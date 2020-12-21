import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SimpleLogin } from 'src/app/services/services.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  hide = true;
  isLoggedIn: boolean;
  simpleLogin: SimpleLogin;
  
  login(): void {
    this.simpleLogin = {
      email: "admin@amadis.com",
      password: "admin"
    }
    this.authService.login(this.simpleLogin).subscribe(response => {
      if (response.ok) {
        console.log("Logger"+ JSON.stringify(response.data));
        this.isLoggedIn = true;
        this.router.navigateByUrl('/orders/list');
      } else {

      }
    });
  }

  ngOnInit(): void {
  }

}
