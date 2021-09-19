import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/user.service";
import {RegisterModel} from "../../model/register.model";
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  public registerForm: FormGroup;

  Roles: any = ['Admin', 'Author', 'Reader'];

  constructor(private httpClient: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      shop_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      c_password: new FormControl(null, [Validators.required]),
    });
  }

  get FormControls() {
    return this.registerForm.controls;
  }

  /** Shop Owner Registration */
  register(){
    if(this.registerForm.value.password === this.registerForm.value.c_password) {
      const register = new RegisterModel();
  
      const formData: any = new FormData();
      formData.append("name", this.registerForm.value.name);
      formData.append("shop_name", this.registerForm.value.shop_name);
      formData.append("email",  this.registerForm.value.email);
      formData.append("password", this.registerForm.value.password);
      formData.append("c_password", this.registerForm.value.c_password);

      this.userService.register(formData).subscribe(
        (res:any) => {
          if(res != null) {
            swal.fire('Success', 'Registered Successfully', 'success');
          }else {
            swal.fire('Error', 'Registered Failed', 'error');
          }
        }
      )
    }else {
      swal.fire('Error', 'Password do not mach', 'error');
    }
  }

}
