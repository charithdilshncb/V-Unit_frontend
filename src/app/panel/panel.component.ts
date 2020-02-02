import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AlertService } from '../_services';

import { Event } from '../_models';
import { Request } from '../_models/request';
import { EventService } from '../_services';
import {RequestService} from '../_services/request.service'

@Component({templateUrl: 'panel.component.html',styleUrls:['panel.component.css'],selector: 'panel'})
export class PanelComponent implements OnInit {
    currentUser: User;
    request:Request[];
    users: User[] = [];
    events: Event[] = [];

    constructor(private alertService: AlertService, private userService: UserService,private eventService: EventService,private requestServiec:RequestService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllEvents();
        this.loadAllRequest();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }
    deleteEvent(id: number) {
        this.eventService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllEvents() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
    private loadAllEvents() {
        this.eventService.getAll().pipe(first()).subscribe(events => { 
            this.events = events; 
        });
    }

    private loadAllRequest() {
        this.requestServiec.getAll().pipe(first()).subscribe(request => { 
            console.log(request);
            this.request = request; 
        });
        // this.ngOnInit();
    }

    private approveEvent(id: string){
        console.log(id);
        this.eventService.approveEvent(id)
            .subscribe(res=>{
                console.log(res);
            })
            this.alertService.success('Aprroved successful', true);
            this.ngOnInit();
    }

    private approveReq(id: string){
        console.log(id);
        this.requestServiec.approveReq(id)
            .subscribe(res=>{
                console.log(res);
            })
            this.alertService.success('Aprroved successful', true);
            this.ngOnInit();
    }

}