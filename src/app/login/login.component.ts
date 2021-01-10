import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SimpleLogin } from '../services/services.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  formGroup: FormGroup;
  isLoggedIn: boolean;
  user: SimpleLogin = new SimpleLogin;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(25)])
    });
  }

  login(): void {
    this.user.email = this.formGroup.controls.email.value;
    this.user.password = this.formGroup.controls.password.value;
    this.authService.login(this.user).subscribe(response => {
      if (response.ok) {
        this.isLoggedIn = true;
        this.router.navigate(['/orders/list']);
      } else {
        if(response.message = "Not found") {
          this.matSnackBar.open('Usuario o contraseña incorrecta.', 'Cerrar', {
            duration: 2000
          });
        }
      }
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

}
