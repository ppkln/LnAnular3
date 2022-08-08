import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import {CrudService} from './../../../service/crud.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products:any = [];

  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.crudService.getAllProduct()
    .subscribe((res)=>{
      console.log("ข้อมูลที่ได้จาก memberRoute.route = "+res);
      this.products = res;
    })
  }

  delete(id:any, i:any){
    console.log("อยู่ในฟังก์ชัน delete() ของไฟล์ product-list.component.ts และเลข Obj : "+id)
    if (window.confirm("ต้องการลบข้อมูลชุดนี้จริงหรือไม่?")){
        this.crudService.deleteProduct(id)
        .subscribe((res)=>{
            this.products.splice(i,1)
        })
    }
  }

}
