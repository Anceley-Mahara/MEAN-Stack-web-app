import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlignDirective, AlertComponent, BorderDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ListGroupDirective, ListGroupItemDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { DocsExampleComponent } from '@docs-components/public-api';
import { first } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-details',
  imports: [CommonModule, TableDirective, TableColorDirective,AlertComponent, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective,
    ListGroupDirective,  FormsModule, ListGroupItemDirective, RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent implements OnInit {
  requestId: any | null = null;
  request: any = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get id from route parameters
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id');
      console.log('Request ID from route:', this.requestId);
      this.loadRequestDetails();
      //this.getUserById(this.userId);
    });
  }

  loadRequestDetails(): void {
    // Call your service to get job details
    this.apiService.getRequestById(this.requestId).subscribe(
      (data) => {
        this.request = data[0]; // Assuming the API returns an array with a single object
        console.log('Request details loaded:', this.request);
        ///this.loading = false;
      },
      (err) => {
        console.error('Error loading request details:', err);
        //this.error = true;
        //this.loading = false;
      }
    );
  }

  updateRequest(): void {
    console.log('Updating request status to:', this.request.request_status);

    // Call the service to update the request in the backend
    this.apiService.updateRequest(this.requestId, this.request).subscribe(
      (response) => {
        console.log('Request status updated successfully:', response, this.request);
        alert('Request status updated successfully');
      },
      (error) => {
        console.error('Error updating request status:', error);
      }
    );
  }

}
