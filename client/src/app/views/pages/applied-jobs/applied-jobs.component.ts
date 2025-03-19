import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../../../services/api-services.service';
import {
  AlignDirective,
  BorderDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ListGroupDirective,
  ListGroupItemDirective,
  RowComponent,
  TableActiveDirective,
  TableColorDirective,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DocsExampleComponent } from '../../../../components/docs-example/docs-example.component';

@Component({
  selector: 'app-applied-jobs',
  standalone: true, // Added standalone property
  imports: [
    TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, CommonModule,
    NgFor, NgIf, ListGroupDirective, ListGroupItemDirective, RowComponent, ColComponent, BorderDirective, AlignDirective,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent
  ],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {
  Appliedjobs: any[] = [];
  applicantId: any;
  userDetails: any;

  constructor(private apiService: ApiServicesService, private route: ActivatedRoute) {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.applicantId = this.userDetails.user_id;
    console.log('Applicant Id', this.applicantId);
  }

  ngOnInit(): void {
    this.getAppliedJobs();
  }

  getAppliedJobs(): void {
    this.apiService.getAppliedJobsById(this.applicantId).subscribe(response => {
      console.log('Applied jobs response:', response);
        this.Appliedjobs = response;
      console.log('Applied jobs:', this.Appliedjobs);
    }, error => {
      console.error('Error fetching job:', error);
    });
  }
}
