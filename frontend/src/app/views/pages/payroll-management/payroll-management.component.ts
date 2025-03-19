import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardFooterComponent, CardHeaderComponent, CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-payroll-management',
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardFooterComponent, CardBodyComponent, DocsExampleComponent, FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective],
  templateUrl: './payroll-management.component.html',
  styleUrl: './payroll-management.component.scss'
})
export class PayrollManagementComponent {
  payslipForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.payslipForm = this.fb.group({
      employee_id: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      basic_salary: ['', Validators.required],
      deductions: ['', Validators.required],
      allowances: ['', Validators.required],
      //net_salary: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.payslipForm.invalid) {
      alert('Please fill all the required fields.');
      return;
    } else {
      this.apiService.generatePayslip(this.payslipForm.value).subscribe(response => {
        this.payslipForm.reset();
        alert('Payslip generated successfully.');
      });
    }
  }
}
