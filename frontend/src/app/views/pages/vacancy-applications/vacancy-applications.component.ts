import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy-applications',
  imports: [CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './vacancy-applications.component.html',
  styleUrl: './vacancy-applications.component.scss'
})
export class VacancyApplicationsComponent {
jobApplications: any = [];

  constructor(private apiService: ApiService,  private route: ActivatedRoute,
    private router: Router) {
    this.getJobApplications();
   }

  getJobApplications() {
    this.apiService.getJobApplications().subscribe((data: any) => {
      this.jobApplications = data;
  });
}

viewApplicants(jobId: number): void {
    this.router.navigate(['/applicant-details', jobId]);
  }
}
