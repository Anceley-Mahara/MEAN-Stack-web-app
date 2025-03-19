import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { ActivatedRoute } from '@angular/router';
import { AlignDirective, BorderDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ListGroupDirective, ListGroupItemDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DocsExampleComponent } from '@docs-components/public-api';
import { routes } from '../../../app.routes';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-view-job',
  imports: [
    TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, CommonModule,
    NgFor, NgIf, ListGroupDirective, ListGroupItemDirective, RowComponent, ColComponent,BorderDirective, AlignDirective,
     TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, RouterModule],
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.scss'
})
export class ViewJobComponent {
  jobs: any[] = [];
  jobId: any;

  constructor(private apiService: ApiServicesService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.jobId = params['vacancy_id'];
    });
    this.apiService.getVacancies().subscribe(response => {
      this.jobs = response;
    }, error => {
      console.error('Error fetching job:', error);
    });
  }
 getJobById(jobId: any): any {
    return this.jobs.find((job: any) => job.id === jobId);
  }

  // In your component
navigateToDetails(id: string): void {
  console.log('Attempting to navigate to:', `/job-details/${id}`);
  this.router.navigate(['/job-details', id]);
}
}
