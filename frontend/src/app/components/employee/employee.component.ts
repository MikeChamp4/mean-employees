import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): Employee {
    return this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.employeeService.employees = res;
      },
      (err: any) => console.error(err)
    );
  }

  addEmployee(form: NgForm) {
    // let missingFields: string = "";

    // if(form.value.name === ""){
    //   missingFields += "Name\n";
    // }

    // if(form.value.position === ""){
    //   missingFields += "Position\n"
    // }

    // if(form.value.office === ""){
    //   missingFields += "Office\n"
    // }

    // if(form.value.salary === 0){
    //   missingFields += "Salary\n"
    // }

    // if(missingFields !== ""){
    //   // this.toastr.error(`There are missing fields to fill out: \n
    //   //                     ${missingFields}`);
    //   this.showToast('e', `There are missing fields to fill out: \n
    //                        ${missingFields}`);
    //   return;
    // }

    const employee = this.checkEmployee(form);
    if (employee === null) {
      return;
    }

    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res: any) => console.log(res),
        (err: any) => console.error(err)
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res: any) => {
          this.getEmployees();
          this.showToast('s', 'Employee created!!');
          form.reset();
        },
        (err: any) => console.error(err)
      );
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Are your sure want to delete it?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (res) => {
          console.log(res), this.getEmployees();
        },
        (err) => console.error(err)
      );
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  clearForm(event: Event, form: NgForm) {
    event.preventDefault();
    form.reset();
  }

  showToast(type: string, message: string) {
    const config: Partial<IndividualConfig> = {
      positionClass: 'toast-bottom-right',
    };

    switch (type) {
      case 'w':
        this.toastr.warning(message, '', config);
        break;
      case 's':
        this.toastr.success(message, '', config);
        break;
      case 'e':
        this.toastr.error(message, '', config);
        break;
      default:
        this.toastr.info(message, '', config);
        break;
    }
  }

  checkEmployee(form: NgForm): Employee | null {
    let missingFields: string = '';

    if (form.value.name === '') {
      missingFields += 'Name\n';
    }

    if (form.value.position === '') {
      missingFields += 'Position\n';
    }

    if (form.value.office === '') {
      missingFields += 'Office\n';
    }

    if (form.value.salary === 0) {
      missingFields += 'Salary\n';
    }

    if (missingFields !== '') {
      this.showToast(
        'e',
        `There are missing fields to fill out: \n${missingFields}`
      );
      return null;
    }

    return form.value;
  }
}
