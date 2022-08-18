import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {CrudService} from './../../../service/crud.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;

  constructor(
    private router:Router,
    private crudService:CrudService,
    private ngZone:NgZone
    ) {
        
     }

  ngOnInit() {
    
  }

  onSubmit(RegistFrm:any){
    console.log("ค่าที่ส่งมาจาก registFrm หน้า register: "+RegistFrm);
    if(RegistFrm.pwd === RegistFrm.cf_pwd){
      this.crudService.Register(RegistFrm)
      .subscribe(null,(error:any)=>{
        let regis='';
        window.alert("สมัครสมาชิกไม่สำเร็จ");
        this.ngZone.run(()=>{this.router.navigateByUrl('/register/'+regis)})
      },()=>{
        console.log("ได้ผ่านหน้าคำสั่งเพิ่มข้อมูลสมาชิกใหม่เข้า MongoDB แล้ว");
        window.alert("สมัครสมาชิกสำเร็จแล้ว");
        this.ngZone.run(()=>{this.router.navigateByUrl('/login')})
      })
    }
  }
}
