import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective
} from '@coreui/angular';
import { NgClass } from '@angular/common';
import { ApiServicesService } from '../../../services/api-services.service';
import { DocsExampleComponent } from '@docs-components/public-api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  standalone: true, // Assuming this is a standalone component based on your imports
  imports: [
    NgClass,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  userDetails: any;
  userId: any;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private apiService: ApiServicesService) {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.userDetails.user_id;
    console.log('User ID', this.userId);

    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_type: ['', Validators.required],
      user_id: ['', Validators.required],
      user_password1: [''], // Holds the original password (readonly)
      user_password2: ['', [
        Validators.required,
        Validators.minLength(8),
        this.createPasswordStrengthValidator()
      ]], // New password
      // This field will be used when submitting the form
      user_password: ['']
    });
  }

  ngOnInit(): void {
    this.getUserDetails(this.userId);
  }

  // Custom validator for password strength
  createPasswordStrengthValidator() {
    return (control: any) => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  getUserDetails(userId: any): void {
    this.apiService.getUser(userId).subscribe((data) => {
      console.log('User', data);
      this.userForm.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        user_type: data.user_type,
        user_id: data.user_id,
        user_password1: data.user_password
      });
    });
  }

  updateUserDetails(): void {
    this.formSubmitted = true;

    // Check if the new password field is valid
    if (this.userForm.get('user_password2')?.invalid) {
      console.log('New password is invalid', this.userForm.get('user_password2')?.errors);
      return;
    }

    // Set the user_password value to the new password before submission
    this.userForm.patchValue({
      user_password: this.userForm.get('user_password2')?.value
    });

    // Prepare the data for submission
    const userData = {
      first_name: this.userForm.get('first_name')?.value,
      last_name: this.userForm.get('last_name')?.value,
      user_type: this.userForm.get('user_type')?.value,
      user_id: this.userForm.get('user_id')?.value,
      user_password: this.userForm.get('user_password2')?.value
    };

    // Use the existing updateUserDetails method
    this.apiService.updateUserDetails(this.userId, userData).subscribe(
      (response) => {
        console.log('User details updated successfully', response);
        alert('Password updated successfully');

        // Update the displayed password after successful update
        this.userForm.patchValue({
          user_password1: this.userForm.get('user_password2')?.value,
          user_password2: ''
        });
      },
      (error) => {
        console.error('Error updating user details', error);
        alert('Failed to update password. Please try again.');
      }
    );
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.formSubmitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);

    if (!field) return '';

    if (field.hasError('required')) {
      return 'This field is required';
    }

    if (fieldName === 'user_password2') {
      if (field.hasError('minlength')) {
        return 'Password must be at least 8 characters long';
      }
      if (field.hasError('passwordStrength')) {
        return 'Password must include uppercase, lowercase, number and special character';
      }
    }

    return '';
  }
}
