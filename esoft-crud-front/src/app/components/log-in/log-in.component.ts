import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../service/user.service";
import {LoginModel} from "../../model/login.model";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  // @ts-ignore
  public loginForm: FormGroup;

  constructor(private httpClient: HttpClient,
              private userService:UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get FormControls() {
    return this.loginForm.controls;
  }


  /** Shop Owner Login */
  login(){
    
    const formData: any = new FormData();
    formData.append("email", this.loginForm.value.email);
    formData.append("password", this.loginForm.value.password);
     

    this.userService.login(formData).subscribe(
      (res:any) =>{
        if(res != null) {
          swal.fire('Success', 'Login Successfully', 'success');
          localStorage.setItem("current_user",res.data.token);
          this.router.navigate(['/dashboard']);
        }else {
          swal.fire('Error', 'Login Failed', 'error');
        }
      }
    )
  }
}
