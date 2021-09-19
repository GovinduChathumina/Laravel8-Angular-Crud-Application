import { Component, OnInit } from '@angular/core';
import {CustomerModel} from "../../model/customer.model";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../../service/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomerComponent} from "../customer/customer.component";
import {MatTableDataSource} from "@angular/material/table";
import swal from "sweetalert2";


export interface PeriodicElement {
  id: number;
  name: string;
  age: number;
  address: string;
  description:string;
  date:string;
  status:string;
  actions:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', age: 24, address: 'Galle', description:'text',date:'25-09-21',status:'pending',actions:''},
  {id: 2, name: 'Hydrogen', age: 24, address: 'Galle', description:'text',date:'25-09-21',status:'pending',actions:''},

];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public customers: CustomerModel[] = [];
  // @ts-ignore
  public data:CustomerModel;
  closeResult: string = "";

  displayedColumns: string[] = ['id', 'name', 'age', 'address','description','date','status','actions'];
  dataSource = new MatTableDataSource<CustomerModel>(this.customers);

  constructor(private httpClient: HttpClient,
              private customerService:CustomerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  /** Load all customers */
  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe(
      (res:any) =>{
        this.customers = res.data;
        this.dataSource.data = this.customers;
      }
    )
  }

  /** Search Customer By Id */
  searchCustomerById(id: number) {
    this.customerService.searchCustomer(id).subscribe(
      (res: any) => {
        this.data = res.data;
        
      }
    );
  }

  open(id: number) {
    this.searchCustomerById(id);
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: '350px',
      data: { customer_name: this.data.customer_name, customer_address: this.data.customer_address
      , customer_age: this.data.customer_age, problem_description: this.data.problem_description
      ,date: this.data.date, problem_status: this.data.problem_status}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  /** Delete Customer By Id */
  deleteCustomer(id: any) {
    this.customerService.deleteCustomer(id).subscribe(
      (res:any) => {
        if(res != null) {
          swal.fire('Success', 'Deleted Successfully', 'success');
          window.location.reload();
        }else {
          swal.fire('Error', 'Deleted Failed', 'error');
        }
      }
    )
  }
}
