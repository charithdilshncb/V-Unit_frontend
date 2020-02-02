import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../_models';

@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Event[]>(`${config.apiUrl}/events`);
    }
    getById(id: number) {
        return this.http.get(`${config.apiUrl}/events/` + id);
    }

    create(event: Event) {
        return this.http.post(`${config.apiUrl}/events/create`, event);
    }
    upload(file: File) {
        return this.http.post(`${config.apiUrl}/_helpers/upload`, file);
    }

    update(event: Event) {
        return this.http.put(`${config.apiUrl}/events/` + event.id, event);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/events/` + id);
    }

    approveEvent(id: string){
        console.log(id);
    let idObj={
       id:id,
     }
        return this.http.post(`${config.apiUrl}/events/approve/` , idObj);
    }

 


    
}