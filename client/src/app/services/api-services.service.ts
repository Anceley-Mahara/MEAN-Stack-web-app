import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private vacancies = 'http://localhost:3000/api/vacancies';
  private employees = 'http://localhost:3000/api/employees';
  private users = 'http://localhost:3000/api/users/login';
  private single_user = 'http://localhost:3000/api/users';
  private payslips = 'http://localhost:3000/api/payslips';
  private job_applications = 'http://localhost:3000/api/jobApplications';
  private requests = 'http://localhost:3000/api/requests';
  private leave = 'http://localhost:3000/api/leave';
  //http://localhost:3000/api/payslips/

  //http://localhost:3000/api/payslips/5/pdf
  constructor(private http: HttpClient) { }

  getPayslipsEmployeeId(employeeId: any): Observable<any> {
    return this.http.get<any>(`${this.payslips}/${employeeId}`);
  }

  updateEmployee(employeeId: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.employees}/${employeeId}/update`, data);
  }

  // downloadPayslip(payslip_id: number): Observable<Blob> {
  //   return this.http.get(`${this.payslips}/${payslip_id}`, { responseType: 'blob' });
  // }

  downloadPayslip(payslip_id: number): Observable<Blob> {
    return this.http.get(`${this.payslips}/${payslip_id}/pdf`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }

  getVacancies(): Observable<any> {
    return this.http.get<any>(this.vacancies);
  }

  getJob(jobId: any): Observable<any> {
    return this.http.get<any>(`${this.vacancies}/${jobId}`);
  }

  postUser(data: any): Observable<any> {
    return this.http.post<any>(this.users, data);
  }

  getUser(userId: any): Observable<any> {
    return this.http.get<any>(`${this.single_user}/${userId}`);
  }

  updateUserDetails(userId: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.single_user}/${userId}/update`, data);
  }

  postJobApplication(data: any): Observable<any> {
    return this.http.post<any>(this.job_applications, data);
  }

  getAppliedJobsById(applicantId: any): Observable<any> {
    return this.http.get<any>(`${this.job_applications}/${applicantId}`);
  }

  createRequest(data: any): Observable<any> {
    return this.http.post<any>(this.requests, data);
  }

  getRequestsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.requests}/${userId}`);
  }

  submitLeave(data: any): Observable<any> {
    return this.http.post<any>(this.leave, data);
  }

  getLeaveApplicationsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.leave}/${userId}`);
  }

}
