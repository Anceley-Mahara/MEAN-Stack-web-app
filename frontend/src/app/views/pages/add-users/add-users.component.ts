import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardFooterComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-users',
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardFooterComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent {
  userForm: FormGroup;
  userId = "";
  password = "";

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userId = this.generateUserId();
    this.password = this.generatePassword();
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_type: ['', Validators.required],
      user_id: ['', Validators.nullValidator],
      user_password: ['', Validators.nullValidator],
    });
  }

 generateUserId = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates 4 random digits
    return `ecn${randomDigits}`;
  };

  generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Please fill all the required fields.');
      return;
    } else {
      // Generate user ID and password
      const userId = this.generateUserId();
      const userPassword = this.generatePassword();

      // Add user ID and password to the form values
      this.userForm.value.user_id = userId;
      this.userForm.value.user_password = userPassword;

      this.apiService.addUser(this.userForm.value).subscribe(response => {
        console.log('User created:', response);
        alert('User created successfully!');
        this.userForm.reset();
      }, error => {
        console.error('Error creating user:', error);
        alert('Error creating user!');
      });
    }
  }

}
