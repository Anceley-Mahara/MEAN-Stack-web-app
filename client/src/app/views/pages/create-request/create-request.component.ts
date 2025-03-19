import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-create-request',
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss'
})
export class CreateRequestComponent {
requestForm: FormGroup;
userDetails: any;
userId: any;

  constructor(private fb: FormBuilder, private apiService: ApiServicesService) {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.userDetails.user_id;
    console.log('User Id: ', this.userId);
    this.requestForm = this.fb.group({
      //request_id: ['', Validators.required],
      request_type: ['', Validators.required],
      request_priority: ['', Validators.required],
      request_description: ['', Validators.required],
      request_status: ['New', Validators.required],
      employee_id: [this.userId, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      alert('Please fill all the required fields.');
      console.log('Req details: ', this.requestForm)
      return;
    } else {
      this.apiService.createRequest(this.requestForm.value).subscribe(response => {
        console.log('Request created:', response);
        alert('Request created successfully!');
        this.requestForm.reset();
      }, error => {
        console.error('Error creating request:', error);
        alert('Error creating request!');
      });
  }
}
}
