import { Component } from '@angular/core';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { ApiService } from '../../../services/api.service';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ListGroupDirective, ListGroupItemDirective, BadgeComponent, FormDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests',
  imports: [
    TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, CommonModule,
    NgFor, NgIf, ListGroupDirective, ListGroupItemDirective, RowComponent, ColComponent, BorderDirective, AlignDirective,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  readonly primaryColor = 'primary';  // Define primary color
  requestsArray: any[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.apiService.getRequests().subscribe((requests) => {
      this.requestsArray = requests;
      console.log('Requests:', this.requestsArray);
    });
  }

    // In your component
navigateToDetails(id: string): void {
  console.log('Attempting to navigate to:', `/request-details/${id}`);
  this.router.navigate(['/request-details', id]);
}

}
