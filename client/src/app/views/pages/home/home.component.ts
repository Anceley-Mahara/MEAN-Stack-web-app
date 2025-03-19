import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective, CardTextDirective,
  TextColorDirective
} from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from '../../dashboard/dashboard-charts-data';
import { WidgetsComponent } from '../../widgets/widgets/widgets.component';
import { ApiServicesService } from '../../../services/api-services.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    imports: [CardTextDirective, WidgetsDropdownComponent, WidgetsComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class HomeComponent implements OnInit {
  icons = freeSet;

  jobs: any[] = [];
  applicantId: any;
  userDetails: any;
  appliedJobs: any[] = [];
  appliedJobsCount: number = 0; // Property to hold the count of applied jobs
  jobsCount: number = 0; // Property to hold the count of all jobs
  requestsCount: number = 0; // Property to hold the count of all requests
  appliedLeaveCount: number = 0; // Property to hold the count of all leave applications

  constructor(private apiService: ApiServicesService) {
    this.userDetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.applicantId = this.userDetails.user_id;
  }

  ngOnInit(): void {
    this.getAppliedJobs();
    this.getJobs();
    this.getUserRequestsByUserId();
    this.getLeaveApplicationsByUserId();
  }

  getJobs(): void {
    this.apiService.getVacancies().subscribe(response => {
      this.jobs = response; // Ensure jobs is always an array
      console.log('All Jobs:', this.jobs);
      this.jobsCount = this.jobs.length; // Update the count
    }, error => {
      console.error('Error fetching jobs:', error);
    });
  }

  getAppliedJobs(): void {
    this.apiService.getAppliedJobsById(this.applicantId).subscribe(response => {
      console.log('Applicant Id:', this.applicantId);
      console.log('Applied jobs response:', response); // Add debugging log
      this.appliedJobs = response; // Ensure appliedJobs is always an array
      this.appliedJobsCount = this.appliedJobs.length; // Update the count
      console.log('applied jobs number', this.appliedJobs.length);
    }, error => {
      console.error('Error fetching job:', error);
    });
  }

  getUserRequestsByUserId(): void {
    this.apiService.getRequestsByUserId(this.applicantId).subscribe(response => {
      console.log('User requests:', response); // Add debugging log
      this.requestsCount = response ? response.length : 0; // Update the count with null check
    }, error => {
      console.error('Error fetching requests:', error);
    });
  }

  getLeaveApplicationsByUserId(): void {
    this.apiService.getLeaveApplicationsByUserId(this.applicantId).subscribe(response => {
      console.log('Leave applications:', response); // Add debugging log
      this.appliedLeaveCount = response ? response.length : 0; // Update the count with null check
    }, error => {
      console.error('Error fetching leave applications:', error);
    });
  }
}
