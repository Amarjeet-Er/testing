import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl: string = 'http://localhost:3000/';

  post_std(data: any) {
    return this.http.post<any>(`${this.baseUrl}student`, data);
  }
  put_std(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}student/${id}`, data);
  }
  get_std() {
    return this.http.get<any>(`${this.baseUrl}student`);
  }
}