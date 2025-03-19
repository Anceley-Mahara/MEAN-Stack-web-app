import { Component } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-leave-management',
  imports: [CommonModule, NgIf, NgFor, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent {
  leaveApplications: any = [];

  constructor(private apiService: ApiService) {
    this.getLeaveApplications();
  }

  getLeaveApplications() {
    this.apiService.getLeaveApplications().subscribe((res) => {
      this.leaveApplications = res;
    });
  }

  approveLeaveApplication(leaveApplication: any) {
    leaveApplication.leave_status = 'approved';
    this.apiService.updateLeaveApplication(leaveApplication).subscribe((res) => {
      this.getLeaveApplications();
    });
    alert('Leave application approved');
    console.log('Leave application approved:', this.leaveApplications);
  }

  rejectLeaveApplication(leaveApplication: any) {
    leaveApplication.leave_status = 'rejected';
    this.apiService.updateLeaveApplication(leaveApplication).subscribe((res) => {
      this.getLeaveApplications();
    });
    alert('Leave application rejected');
    console.log('Leave application rejected:', leaveApplication);
  }
}
