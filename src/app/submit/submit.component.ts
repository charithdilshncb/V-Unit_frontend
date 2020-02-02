import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../_services';
import { RequestService } from '../_services/request.service';

@Component({templateUrl: 'submit.component.html'})
export class SubmitComponent implements OnInit {
    createForm:any;
    loading = false;
    submitted = false;
    selectedFile: File;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private requestService: RequestService,
        private alertService: AlertService) { }

    ngOnInit() {
        if(localStorage.getItem('currentUser')==null){
            this.router.navigateByUrl('/login');
        }
        this.createForm = this.formBuilder.group({
            title: ['', Validators.required],
            type: ['', Validators.required],
            location: ['', Validators.required],
            brief: ['', Validators.required]
        });
    }

    get title(){return this.createForm.get('title')}
    get type(){return this.createForm.get('type')}
    get location(){return this.createForm.get('location')}
    get brief(){return this.createForm.get('brief')}

    // convenience getter for easy access to form fields
    get f() { return this.createForm.controls; }
    onFileChanged() {
        this.selectedFile = File[0];
      }
    onUpload() {
        // this.http is the injected HttpClient
        this.requestService.upload(this.selectedFile)
          .subscribe(request => {
            console.log(request); // handle event here
          });
      }
    onSubmit(form:any) {
        console.log(form);

        const request=form.value;

        this.submitted = true;

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;
        this.requestService.create(request)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.alertService.success('Request submitted', true);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
