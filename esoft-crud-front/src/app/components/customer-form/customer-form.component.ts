import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerModel} from "../../model/customer.model";
import {CustomerService} from "../../service/customer.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  constructor(private customerService: CustomerService) {
  }
  // @ts-ignore
  public newCustomerForm: FormGroup;
  ngOnInit(): void {
    this.newCustomerForm = new FormGroup({
      customer_name: new FormControl(null, [Validators.required]),
      customer_address: new FormControl(null, [Validators.required]),
      customer_age: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      problem_description: new FormControl(null, [Validators.required]),
      problem_status: new FormControl(null, [Validators.required]),
    });
  }

  get FormControls() {
    return this.newCustomerForm.controls;
  }

  saveNewComplaint() {
    
    const formData: any = new FormData();
    // formData.append("token", localStorage.getItem("current_user"));
    formData.append("customer_name", this.newCustomerForm.value.customer_name);
    formData.append("customer_age", this.newCustomerForm.value.customer_age);
    formData.append("customer_address", this.newCustomerForm.value.customer_address);
    formData.append("problem_description", this.newCustomerForm.value.problem_description);
    formData.append("date", this.newCustomerForm.value.date);
    formData.append("problem_status", this.newCustomerForm.value.problem_status);

    this.customerService.saveCustomer(formData).subscribe(
      (res:any) =>{
        if(res != null) {
          swal.fire('Success', 'Saved Successfully', 'success');
        }else {
          swal.fire('Error', 'Saved Failed', 'error');
        }
      }
    )
  }
}
