import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services/user.service';

import { Request } from '../_models';
import { RequestService } from '../_services/request.service';
import { request } from 'https';

@Component({templateUrl: 'requests.component.html',  selector: 'requests',styleUrls:['requests.component.css']})
export class RequestsComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    events: Event[] = [];
    show = 5;
    request:Request[];
    panelOpenState = false;
    constructor(private userService: UserService,private requestService: RequestService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllRequest();
    }
    // loadAllRequest(): any {
    //     throw new Error("Method not implemented.");
    // }

    deleteEvent(id: number) {
        this.requestService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllRequest() 
        });
    }

    
    private loadAllRequest() {
        this.requestService.getAll().pipe(first()).subscribe(request => {
            console.log(request); 
            this.request = request; 
        });
    }
}