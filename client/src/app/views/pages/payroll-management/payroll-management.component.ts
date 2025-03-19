import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {GridModule,
  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
  RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
  CardBodyComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective,
  ColDirective, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective,
  AlertComponent,
  FormFeedbackComponent,
  CardTextDirective,
} from '@coreui/angular';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-payroll-management',
  standalone: true, // Ensure this component is standalone
  imports: [
    TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, CommonModule,
    NgFor, NgIf, ListGroupDirective, ListGroupItemDirective, RowComponent, ColComponent,BorderDirective, AlignDirective,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent,
    FormControlDirective, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective,
    FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
    ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, GridModule, AlertComponent, FormFeedbackComponent,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
     DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective,
      FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent,
     FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, CardTextDirective,
  ],
  templateUrl: './payroll-management.component.html',
  styleUrls: ['./payroll-management.component.scss']
})
export class PayrollManagementComponent {
  searchForm: FormGroup;
  payslips: any[] = [];
  customStylesValidated = false;
  loading = false;
  error = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiServicesService) {
    // Initialize the form here to avoid using ngOnInit
    this.searchForm = this.fb.group({
      employee_id: ['', Validators.required]
    });
  }
  //ngOnInit(): void { }
  onSubmit(): void {
     if (this.searchForm.invalid) {
      this.customStylesValidated = false;
      alert('Please enter a valid employee ID.');
     } else {
    this.customStylesValidated = true;

    const employeeId = this.searchForm.value.employee_id;

    this.apiService.getPayslipsEmployeeId(employeeId).subscribe(result =>{
      // If the result is not an array but a single object, wrap it in an array
    if (result && !Array.isArray(result)) {
      this.payslips = [result];
    } else {
    this.payslips = result || [];
    alert('No payslips found for the given employee ID.');
  };
    });
  }
}

downloadPayslip(payslipId: number): void {
  if (!payslipId) {
    this.error = 'Cannot download - invalid payslip ID';
    return;
  }

  console.log('Downloading payslip with ID:', payslipId);
  this.loading = true;

  this.apiService.downloadPayslip(payslipId).subscribe({
    next: (blob: Blob) => {
      console.log('Received blob of size:', blob.size, 'and type:', blob.type);

      if (blob.size === 0) {
        this.error = 'Received empty PDF file';
        this.loading = false;
        return;
      }

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip-${payslipId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      this.loading = false;
      this.successMessage = 'PDF downloaded successfully.';
    },
    error: (err) => {
      console.error('Error downloading payslip:', err);
      this.error = 'Failed to download payslip. Please try again.';
      this.loading = false;
    }
  });
}

  // downloadPayslip(payslip_id: number): void {
  //   this.apiService.downloadPayslip(payslip_id).subscribe(blob => {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = `payslip_${payslip_id}.pdf`;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
}
