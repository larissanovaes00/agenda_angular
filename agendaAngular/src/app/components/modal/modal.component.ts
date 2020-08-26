import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize, timeInterval, delay } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalRef: BsModalRef;
  type: string;
  sendForm: FormGroup;
  save = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: BsModalRef
    ) { }

  ngOnInit() { 
    this.sendForm = this.formBuilder.group({
      contact: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  onSubmit = () => {
    const data = this.sendForm.value;
    
    if(this.type === 'criar') {
      this.apiService.create(data)
      .pipe(
        finalize(() => {
          this.save = true;
          this.close();
        })
      )
      .subscribe()
    }

    if(this.type === 'editar'){
      console.log('Vai Editar')
    }
  }
  close = () => {
    setTimeout(() => {
      this.modalService.hide();
    }, 1000)
  }
}
