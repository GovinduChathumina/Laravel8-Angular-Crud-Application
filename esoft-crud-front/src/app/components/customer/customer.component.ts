// @ts-ignore
import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerModel} from "../../model/customer.model";
import {CustomerService} from "../../service/customer.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // @ts-ignore
  public customerForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      customer_name: new FormControl(null, [Validators.required]),
      customer_address: new FormControl(null, [Validators.required]),
      customer_age: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      problem_description: new FormControl(null, [Validators.required]),
      problem_status: new FormControl(null, [Validators.required]),
    });
  }

  get FormControls() {
    return this.customerForm.controls;
  }

  updateCustomerDetails() {
    const customer = new CustomerModel();
    customer.id = this.data.id;
    customer.customer_name = this.customerForm.value.customer_name;
    customer.customer_address = this.customerForm.value.customer_address;
    customer.customer_age = this.customerForm.value.customer_age;
    customer.date = this.customerForm.value.date;
    customer.problem_status = this.customerForm.value.problem_status;
    customer.problem_description = this.customerForm.value.problem_description;

    this.customerService.updateCustomer(customer).subscribe(
      (res:any) => {
        if(res != null) {
          swal.fire('Success', 'Updated Successfully', 'success');
        }else {
          swal.fire('Error', 'Updated Failed', 'error');
        }
      }
    )
  }
}
