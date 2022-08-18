import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //home page
  Home_Page: string = 'http://localhost:4200';
  // node/Express API
  REST_API:string = 'http://localhost:8000/api';
  //HttpHeaders
  HttpHeaders = new HttpHeaders().set('Content-Type','application/json');
  userLogin:any;

  constructor(private httpClient: HttpClient,
    private ngZone:NgZone,
    private router:Router) {
      
     }

  //add member
  Register(data:any): Observable<any> {
    let API_URL = this.REST_API+'/register';
    console.log("ค่าของ data ที่มาจากหน้า register.component.ts: "+data)
    return this.httpClient.post(API_URL,data,{headers:this.HttpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  
  //show all profile
  allProfile(){
    return this.httpClient.get(this.REST_API);
  }

  //Get one profile member
  getProfile(id:any): Observable<any>{
    let API_URL = this.REST_API+'/read-profile/'+id;
    return this.httpClient.get(API_URL,{headers:this.HttpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError)
    )
  }
// Update profile
updateProfile(id:any, data:any): Observable<any>{
  let API_URL = this.REST_API+'/update-profile/'+id;
  return this.httpClient.put(API_URL,data,{headers:this.HttpHeaders})
  .pipe(
    catchError(this.handleError)
  )
}
//Delete Member
deleteMember(id:any): Observable<any>{
  let API_URL = this.REST_API+'/delete-member/'+id;
  return this.httpClient.delete(API_URL,{headers:this.HttpHeaders})
  .pipe(
    catchError(this.handleError)
  )
}
//login section
Login(data:any): Observable<any>{
  let API_URL = this.REST_API+'/login';
  return this.httpClient.post(API_URL,data,{headers:this.HttpHeaders})
  .pipe(map((res:any)=>{
    console.log("อยู่ในคำสัง .pipe แล้ว");
    console.log("ค่าของ res.sessionLoginStatus = "+res.sessionLoginStatus)
    console.log("ค่าของ res.sessionUserName = "+res.sessionUserName)
    this.userLogin = res.sessionUserID;
    console.log("อยู่ใน service การ login ค่าที่ return ออกมาเมื่อ login ผ่าน = "+res);
    return res || {}
  }),
    catchError(this.handleError)
  )
}

//******* Products Management */
// add product
AddProduct(data:any): Observable<any> {
  let API_URL = this.REST_API+'/add-product';
  console.log("ค่าของ data ที่มาจากหน้า add-product.component.ts: "+data)
  console.log("กำลังอยู่ในฟังก์ชัน AddProduct ใน crudService")
  return this.httpClient.post(API_URL,data)
  .pipe(
    catchError(this.handleError)
  )
}
 //show all product
 getAllProduct(){
  let API_URL = this.REST_API+'/read-product';
    return this.httpClient.get(API_URL,{headers:this.HttpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
      catchError(this.handleError)
    )
}
//delete product
deleteProduct(id:any){
  let API_URL = this.REST_API+'/delete-product/'+id;
  return this.httpClient.delete(API_URL,{headers:this.HttpHeaders})
  .pipe(map((res:any)=>{
    catchError(this.handleError)
  }))
}



 //handle Error
 handleError(error:HttpErrorResponse){
  let errorMessage ='';
  if (error.error instanceof ErrorEvent){
    // handleError client's error
    errorMessage='ฟังก์ชัน handleError แจ้งว่าเกิด client error คือรหัส '+error.error.message;
  } else {
    // handleError Server's error
    errorMessage ='ฟังก์ชัน handleError แจ้งว่าเกิด Server Error code คือรหัส '+error.status+'\n ข้อความ error คือ : ' +error.message;
  }
  console.log("มี Error และฟังก์ชัน handleError เป็นผู้แจ้งข้อความนี้ (ภายในไฟล์ crud.service.ts)");
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
