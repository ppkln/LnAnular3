import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import {CrudService} from './../../../service/crud.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  
  

   constructor(public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService:CrudService) {
    }

  ngOnInit() {

  }


  onSubmit(proFrm:any){
    
    console.log("ค่าที่ส่งมาจาก proFrm หน้า add product: "+proFrm);
      this.crudService.AddProduct(proFrm)
      .subscribe(null,(error:any)=>{
        let addProd='';
        window.alert("เพิ่มข้อมูลสินค้าไม่สำเร็จ (รหัสสินค้านี้มีในฐานข้อมูลแล้ว)");
        this.ngZone.run(()=>{this.router.navigateByUrl('/add-product/'+addProd)})
      },()=>{
        let Agn='';
        console.log("ได้ผ่านหน้าคำสั่งเพิ่มข้อมูลสมาชิกใหม่เข้า MongoDB แล้ว");
        window.alert("เพิ่มข้อมูลสินค้าสำเร็จ");
        this.ngZone.run(()=>{this.router.navigateByUrl('/product-list')})
      })
  }

}
