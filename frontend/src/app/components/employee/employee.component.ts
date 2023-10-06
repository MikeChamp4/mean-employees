//import { MatDialog } from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public employeeService: EmployeeService,
    private toastr: ToastrService,
    private confirmService: NgConfirmService,
    //private dialog: MatDialog
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

    const employee = this.checkEmployee(form);
    if (employee === null) {
      return;
    }

    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(
        (res: any) => {
          this.getEmployees();
          this.showToast("s", 'Updated Employee!!')
          console.log(res)
        },
        (err: any) => console.error(err)
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res: any) => {
          this.getEmployees();
          this.showToast('s', 'Created Employee!!');
          console.log(res)
          form.reset();
        },
        (err: any) => console.error(err)
      );
    }
  }

  deleteEmployee(id: string) {
      // this.confirmService.showConfirm("Are your sure want to delete it?",
      //   () => {
      //     this.employeeService.deleteEmployee(id).subscribe(
      //       (res) => {
      //         console.log(res), this.getEmployees();
      //         this.showToast('e', 'Deleted Employee')
      //       },
      //       (err) => console.error(err)
      //     );
      //   },
      //   () => { }
      // )
      // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //   data: 'Are you sure you want to delete this employee?'
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   if (result) {
      //     this.employeeService.deleteEmployee(id).subscribe(
      //       (res) => {
      //         console.log(res);
      //         this.getEmployees();
      //         this.showToast('e', 'Deleted Employee');
      //       },
      //       (err) => console.error(err)
      //     );
      //   }
      // });
  }

  editEmployee(employee: Employee) {
    //this.clearForm(event, form); // Restablecer los valores del formulario
    this.getEmployees();
    this.employeeService.selectedEmployee = employee;
  }

  clearForm(event: Event, form: NgForm) {
    event.preventDefault();
    form.reset({
      name: '',
      position: '',
      office: '',
      salary: 0
    });
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
