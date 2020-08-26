import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output()  atualiza = new EventEmitter<boolean>();
  
  modalRef: BsModalRef;
  type: string;
  sendForm: FormGroup;
  save = false;
  deleted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: BsModalRef
    ) { }

  ngOnInit() {
    this.sendForm = this.formBuilder.group({
      contact: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
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
          this.refresh();
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

  delete(){
    this.atualiza.emit(true);
  }

  onDelete(id){
    this.apiService.delete(id);
    this.deleted = true;
    this.close();
    this.apiService.getAll();
  }

  refresh(): void {
    setTimeout(() =>{
      window.location.reload();
    }, 1000)
  }

}
