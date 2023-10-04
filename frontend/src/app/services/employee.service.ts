import { Employee } from 'src/app/models/employee';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://127.0.0.1:4000/api/employees'

  selectedEmployee: Employee = {
    name: "",
    office: "",
    position: "",
    salary: 0,
    // createdAt: "",
    // updatedAt: "",
    // _id: ""
  };

  employees: Employee[] = [];
  constructor(private http: HttpClient) { }

  getEmployees(): any {
    return this.http.get<Employee>(this.URL_API);
  }

  createEmployee(employee: Employee){
    return this.http.post(this.URL_API, employee);
  }

  putEmployee(employee: Employee){
    return this.http.put(`${this.URL_API}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

}

