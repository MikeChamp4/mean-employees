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

  constructor( public employeeService: EmployeeService){ }

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

      let missingFields: string = "There are missing fields to fill out: \n";

      if(form.value.name === ""){
        missingFields += "Name\n";
      }

      if(form.value.position === ""){
        missingFields += "Position\n"
      }

      if(form.value.office === ""){
        missingFields += "Office\n"
      }

      if(form.value.salary === 0){
        missingFields += "Salary\n"
      }

      if(missingFields !== ""){
        alert(missingFields)
        return;
      }

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
      this.employeeService.selectedEmployee = this.emptyData(employee);
    }

    clearForm(event: Event, form: NgForm) {
      event.preventDefault();
      form.reset();
    }

    emptyData(employee: Employee): Employee{

      // if(employee.name === ""){
      //   alert("You must fill out the name")
      // }

      // if(employee.position === ""){
      //   alert("You must fill out the position")
      // }

      // if(employee.office === ""){
      //   alert("You must fill out the office")
      // }

      // if(employee.salary === 0){
      //   alert("You must fill out the salary");
      // }

      return employee;
    }
}

