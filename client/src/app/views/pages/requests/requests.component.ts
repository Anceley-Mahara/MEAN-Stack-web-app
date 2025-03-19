import { Component } from '@angular/core';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ListGroupDirective, ListGroupItemDirective, BadgeComponent, FormDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-requests',
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ListGroupDirective, ListGroupItemDirective, BadgeComponent, ReactiveFormsModule, FormDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  readonly primaryColor = 'primary';  // Define primary color

  readonly sampleList: string[] = [
    'Cras justo odiocccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac',
    'Vestibulum at eros'
  ];

}
