import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, AlertComponent , RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, CardFooterComponent } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [CommonModule, AlertComponent,ReactiveFormsModule, FormsModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  showAlert: boolean = false;

  constructor( private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {

      this.loginForm = this.fb.group({
        user_type: ['', Validators.required],
        user_id: ['', Validators.required],
        user_password: ['', Validators.required]
      });
     }

    ngOnInit(): void {
      // this.loginForm = this.fb.group({
      //   user_type: ['', Validators.required],
      //   user_id: ['', Validators.required],
      //   user_password: ['', Validators.required]
      // });
    }
    onSubmit(): void {
      if (this.loginForm.valid) {
        //this.showAlert = false;
        const loginData = this.loginForm.value;
        this.apiService.postUser(loginData).subscribe(response => {
          console.log('Login successful', loginData);
          localStorage.setItem('user', JSON.stringify(loginData));
          this.router.navigate(['/dashboard']);
        }, error => {
          console.error('Login failed', error);
          if (error.status === 401) {
            console.log('Login details: ', loginData);
            alert('Invalid credentials. Please check your username and password.');
          } else if (error.status === 404) {
            alert('User not found. Please check your username.');
          } else {
            alert('An error occurred. Please try again.');
          }
        });
      } else {
        this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 4000); // Hide the alert after 4 seconds    }
  }
}
}
