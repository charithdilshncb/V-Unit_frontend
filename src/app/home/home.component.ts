import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../_services';
import { Event, Role, User } from '../_models';
import { EventService } from '../_services';

@Component({templateUrl: 'home.component.html',styleUrls:['home.component.css']})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    events: Event[] = [];
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    constructor(private userService: UserService,private eventService: EventService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllEvents();
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
        };
 
    this.myParams = {
            particles: {
                number: {
                    value: 200,
                },
                color: {
                    value: '#ed1354'
                },
                shape: {
                    type: 'circle',
                },
        }
    };
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
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
}