import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService){ }

    ngOnInit(): void {
      this.getEmployees();
    }

    getEmployees() :Employee{
      return this.employeeService.getEmployees().subscribe(
        (res: any) => {
          this.employeeService.employees = res;
        },
        (err: any) => console.error(err)
      );
    }

    addEmployee(form: NgForm){
      if(form.value._id){
        this.employeeService.putEmployee(form.value).subscribe(
          (res: any) => console.log(res),
          (err: any) => console.error(err)
        )
      } else{
        this.employeeService.createEmployee(form.value).subscribe(
          (res: any) => {
            this.getEmployees();
            form.reset();
          },
          (err: any) => console.error(err)
        );
      }
    }

    deleteEmployee(id: string){
      if (confirm("Are your sure want to delete it?")){
        this.employeeService.deleteEmployee(id).subscribe(
          res => {
            console.log(res),
            this.getEmployees()
          },
          err => console.error(err)
        )
      }
    }

    editEmployee(employee: Employee){
      this.employeeService.selectedEmployee = employee;
    }

    clearForm(event: Event, form: NgForm) {
      event.preventDefault();
      form.resetForm();
    }

    // emptyFields(employee: Employee): Employee{

    //   if(employee.name == "")

    //   return employee;
    // }
}

