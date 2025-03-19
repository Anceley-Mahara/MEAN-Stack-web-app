import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlignDirective, AlertComponent, BorderDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ListGroupDirective, ListGroupItemDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { ApiServicesService } from '../../../services/api-services.service';
import { DocsExampleComponent } from '@docs-components/public-api';
import { first } from 'rxjs';

@Component({
  selector: 'app-job-details',
  imports: [CommonModule, TableDirective, TableColorDirective,AlertComponent, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective,
    ListGroupDirective, ListGroupItemDirective, RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit {
  jobId: string | null = null;
  job: any = null;
  user: any = null;
  storedUser: any = null;
  userId: any;
  userDetails: any;
  showAlert: boolean = false;

  constructor(private apiService: ApiServicesService, private route: ActivatedRoute) {
    this.storedUser = localStorage.getItem('user');
    this.user = JSON.parse(this.storedUser);
    this.userId = this.user.user_id;
    console.log('Local storage user details:', this.storedUser);
}
ngOnInit(): void {
  // Get id from route parameters
  this.route.paramMap.subscribe(params => {
    this.jobId = params.get('id');
    console.log('Job ID from route:', this.jobId);
    this.loadJobDetails();
    this.getUserById(this.userId);
  });
}

loadJobDetails(): void {
  // Call your service to get job details
  this.apiService.getJob(this.jobId).subscribe(
    (data) => {
      console.log('Job details loaded:', data);
      this.job = data;
      ///this.loading = false;
    },
    (err) => {
      console.error('Error loading job details:', err);
      //this.error = true;
      //this.loading = false;
    }
  );
}

getUserById(userId: string): void {
  // Call your service to get user details
  this.apiService.getUser(userId).subscribe(
    (data) => {
      console.log('User details loaded:', data);
      this.userDetails = data;
      //this.loading = false;
    },
    (err) => {
      console.error('Error loading user details:', err);
      //this.error = true;
      //this.loading = false;
    }
  );
}

postJobApplication(): void {
  // Call your service to post job application
  const data = {
    first_name: this.userDetails.first_name,
    last_name: this.userDetails.last_name,
    job_applied_title: this.job.title,
    applicant_id: this.userId,
    vacancy_id: this.jobId,
    //status: 'pending'
  };
  this.apiService.postJobApplication(data).subscribe(
    (data) => {
      console.log('Job application posted:', data);
      alert('Job application submitted successfully!');
    },
    (err) => {
      console.error('Error posting job application:', err);
      //this.error = true;
      //this.loading = false;
    }
  );
}
}
