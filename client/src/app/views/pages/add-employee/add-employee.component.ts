import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiServicesService) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      employee_id: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      alert('Please fill all the required fields.');
      return;
    } else {
      this.apiService.updateEmployee(this.employeeForm.get('employee_id')?.value, this.employeeForm.value).subscribe(response => {
        console.log('Profile updated:', response);
        alert('Profile updated successfully!');
        this.employeeForm.reset();
      }, error => {
        console.error('Error profile:', error);
        alert('Error updating profile!');
      });
    }
  }
}
