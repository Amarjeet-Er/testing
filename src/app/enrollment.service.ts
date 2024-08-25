import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private localStorageKey = 'students';
  private lastIdKey = 'lastStudentId'; // Key to store the last used ID

  constructor() {}

  post_std(data: any) {
    const students = this.get_std() || [];
    const newId = this.getNextId();
    students.push({ ...data, id: newId });
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
    this.setLastId(newId);
  }

  put_std(id: number, data: any) {
    const students = this.get_std() || [];
    const index = students.findIndex((std: any) => std.id === id);
    if (index !== -1) {
      students[index] = { ...data, id };
      localStorage.setItem(this.localStorageKey, JSON.stringify(students));
    }
  }

  get_std() {
    const students = localStorage.getItem(this.localStorageKey);
    return students ? JSON.parse(students) : [];
  }

  private getNextId(): number {
    const lastId = Number(localStorage.getItem(this.lastIdKey)) || 0;
    return lastId + 1;
  }

  private setLastId(id: number): void {
    localStorage.setItem(this.lastIdKey, id.toString());
  }
}
