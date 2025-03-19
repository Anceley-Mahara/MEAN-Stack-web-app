import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private vacancies = 'http://localhost:3000/api/vacancies';
  private employees = 'http://localhost:3000/api/employees';
  private users = 'http://localhost:3000/api/users';
  private login_user = 'http://localhost:3000/api/users/login';
  private payslips = 'http://localhost:3000/api/payslips';
  private requests = 'http://localhost:3000/api/requests';
  private leaves = 'http://localhost:3000/api/leave';
  private jobApplications = 'http://localhost:3000/api/jobApplications';

  constructor(private http: HttpClient) { }

  createJobApplication(application: any): Observable<any> {
    return this.http.post<any>(`${this.vacancies}/`, application);
  }

  getVacancies(): Observable<any> {
    return this.http.get<any>(`${this.vacancies}/`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.employees}/`, employee);
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.employees}/`);
  }

  addUser(user:any): Observable<any> {
    return this.http.post<any>(`${this.users}/`, user);
  }

  postUser(data: any): Observable<any> {
    return this.http.post<any>(this.login_user, data);
  }

  generatePayslip(data: any): Observable<any> {
    return this.http.post(`${this.payslips}/generate-payslip`, data);
  }

  getRequests(): Observable<any> {
    return this.http.get<any>(`${this.requests}/`);
  }

  getRequestById(requestId: string): Observable<any> {
    return this.http.get<any>(`${this.requests}/${requestId}/request-details`);
  }

  updateRequest(requestId: string, request: any): Observable<any> {
    return this.http.put<any>(`${this.requests}/${requestId}/update-request`, request);
  }

  getLeaveApplications(): Observable<any> {
    return this.http.get<any>(`${this.leaves}/`);
  }

  updateLeaveApplication(leaveApplication: any): Observable<any> {
    return this.http.put<any>(`${this.leaves}/${leaveApplication.created_id}/`, leaveApplication);
  }

  getJobApplications(): Observable<any> {
    return this.http.get<any>(`${this.jobApplications}/`);
  }

  getJobApplicationById(jobApplicationId: string): Observable<any> {
    return this.http.get<any>(`${this.jobApplications}/${jobApplicationId}/`);
  }
}
