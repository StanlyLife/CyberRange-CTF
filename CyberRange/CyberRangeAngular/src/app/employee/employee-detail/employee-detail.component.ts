import { Component, OnInit } from '@angular/core';    
import { ActivatedRoute, Router } from '@angular/router';  
import { Employee } from '../employee';  
import { EmployeeService } from '../employee.service';  
    
@Component({    
  selector: 'app-employee-detail',    
  templateUrl: './employee-detail.component.html',    
  styleUrls: ['./employee-detail.component.scss']    
})    
export class EmployeeDetailComponent implements OnInit {    
  pageTitle = 'Employee Detail';    
  errorMessage = '';    
  employee: Employee | undefined;    
    
  constructor(private route: ActivatedRoute,    
    private router: Router,    
    private employeeService: EmployeeService) { }    
    
  ngOnInit() {    
    const id = this.route.snapshot.paramMap.get('id');    
    if (id) {    
      this.getEmployee(id);    
    }    
  }    
    
  getEmployee(id: string) {    
    this.employeeService.getEmployee(id).subscribe(    
      employee => this.employee = employee,    
      error => this.errorMessage = <any>error);    
  }    
    
  onBack(): void {    
    this.router.navigate(['/employees']);    
  }    
}    