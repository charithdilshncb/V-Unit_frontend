import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, EventService } from '../_services';

@Component({templateUrl: 'create.component.html'})
export class CreateComponent implements OnInit {
    createForm: FormGroup;
    loading = false;
    submitted = false;
    selectedFile: File;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private eventService: EventService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            eventname: ['', Validators.required],
            host: ['', Validators.required],
            venue: ['', Validators.required],
            description: ['', Validators.required],
            date: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.createForm.controls; }
    
    onFileChanged() {
        this.selectedFile = File[0];
      }

    onUpload() {
        // this.http is the injected HttpClient
        this.eventService.upload(this.selectedFile)
          .subscribe(event => {
            console.log(event); // handle event here
          });
      }
      
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        this.eventService.create(this.createForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Event created', true);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
