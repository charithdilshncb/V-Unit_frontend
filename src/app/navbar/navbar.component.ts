import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { AnyCnameRecord } from 'dns';



@Component({selector: 'navbar',templateUrl: 'navbar.component.html',styleUrls:['navbar.component.css']})
export class NavbarComponent implements OnInit {
role:any = null;
log:boolean = false

    constructor(private authenticationService:AuthenticationService) {
    }

    ngOnInit() {
        if(localStorage.getItem('currentUser')==null)
            this.log = false;
        else
            this.log =true;
       this.role=JSON.parse(localStorage.getItem('currentUser')).role;
       console.log(this.role);
    }
}