import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import {CrudService} from './../../../service/crud.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userLogin:any;
  

  constructor(private ngZone:NgZone,
    private router:Router,
    private crudService:CrudService) { }

  ngOnInit(): void {
  }

}
