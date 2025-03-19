import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-post-job',
  imports: [ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      min_qualification: ['', Validators.required],
      department: ['', Validators.required],
      min_salary: ['', Validators.required],
      max_salary: ['', Validators.required],
      required_experience: ['', Validators.required],
      required_skills: ['', Validators.required],
      job_description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      alert('Please fill all the required fields.');
      return;
    } else {
      this.apiService.createJobApplication(this.jobForm.value).subscribe(response => {
        console.log('Job application created:', response);
        alert('Job application created successfully!');
      }, error => {
        console.error('Error creating job application:', error);
        alert('Error creating job application!');
      });
    }
  }
}
