import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import { AlignDirective, BorderDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';

@Component({
  selector: 'app-applicant-details',
  imports: [CommonModule, DocsExampleComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
     TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.scss'
})
export class ApplicantDetailsComponent implements OnInit {
  jobId: any; // Variable to store job ID
  applicants: any[] = []; // Array to store applicants' detail

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('created_id');
    this.loadApplicantsDetails();
  }

  loadApplicantsDetails(): void {
    this.apiService.getJobApplicationById(this.jobId).subscribe(
      (data) => {
        this.applicants = data;
        console.log('Applicants details loaded:', this.applicants);
      },
      (err) => {
        console.error('Error loading applicants details:', err);
      }
    );
  }
}
