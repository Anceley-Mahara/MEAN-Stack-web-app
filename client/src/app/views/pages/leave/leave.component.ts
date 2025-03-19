import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent {
leaveForm: FormGroup;
userDetails: any;
userId: any;

  constructor(private fb: FormBuilder, private apiService: ApiServicesService) {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.userDetails.user_id;
    this.leaveForm = this.fb.group({
      //leave_id: ['', Validators.required],
      leave_type: ['', Validators.required],
      starting_date: ['', Validators.required],
      end_date: ['', Validators.required],
      leave_status: ['Pending', Validators.required],
      employee_id: [this.userId, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      alert('Please fill all the required fields.');
      return;
    } else {
      this.apiService.submitLeave(this.leaveForm.value).subscribe(response => {
        console.log('Leave created:', response);
        alert('Leave created successfully!');
        this.leaveForm.reset();
      }, error => {
        console.error('Error creating leave:', error);
        alert('Error creating leave!');
      });
  }
  }
}
