import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import {CrudService} from './../../../service/crud.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginData:any;
  userLogin:any;

  constructor(private ngZone:NgZone,
    private router:Router,
    private crudService:CrudService) { }

  ngOnInit(): void {
  }

  onSubmit(loginFrm:any){
    console.log("ค่าที่ส่งมาจาก loginForm หน้า Login : "+loginFrm);
    this.crudService.Login(loginFrm)
    .subscribe((data)=>{
      window.alert("ทำการ Login เข้าระบบสำเร็จแล้ว");
      console.log("มาถึงการทำงาน onSubmit หน้า login.component.ts แล้ว");
      console.log("อยู่หน้า login.component.ts แล้ว ค่า session.sessionUserName = "+data.sessionUserName);
      this.userLogin=data.sessionUserID;
      this.ngZone.run(()=>{this.router.navigateByUrl('profile/'+this.userLogin)})
    },(error:any)=>{
      let loginAgn='';
      window.alert("Login เข้าระบบไม่สำเร็จ");
      this.ngZone.run(()=>{this.router.navigateByUrl('/login/'+loginAgn)})
    },null)
  }

}
