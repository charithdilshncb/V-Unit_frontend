import { Component } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    animations: [fadeAnimation]
})

export class AppComponent { }