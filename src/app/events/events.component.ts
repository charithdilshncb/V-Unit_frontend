import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { Event } from '../_models';
import { EventService } from '../_services';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({templateUrl: 'events.component.html',  selector: 'events',styleUrls:['events.component.css']})
export class EventsComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    events: Event[] = [];
    show = 5;

    constructor(private userService: UserService,private eventService: EventService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllEvents();
    }

    deleteEvent(id: number) {
        this.eventService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllEvents() 
        });
    }

    
    private loadAllEvents() {
        this.eventService.getAll().pipe(first()).subscribe(events => { 
            this.events = events; 
            for(var i=0; i<this.events.length;i++){
                this.events[i]['count'] = i;
                this.events[i]['participant'] = Math.floor((Math.random()*20)+10);
                if(this.events[i]['participant']%2==0)
                    this.events[i]['join'] = 'Join';
                else
                    this.events[i]['join'] = 'Quit';
            }
            console.log(this.events);
        });
    }

    private join(id: any){
        console.log(id);
        if(this.events[id]['join'] =='Join'){
            this.events[id]['participant']++;
            this.events[id]['join'] ='Quit';
        } else {
            this.events[id]['participant']--;
            this.events[id]['join'] ='Join'
        }
    }
}