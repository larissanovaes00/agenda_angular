import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { finalize } from 'rxjs/operators';
import { ActionService } from 'src/app/services/actions.service';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

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
  deleted = false;
  buttonSubmit = true;
  id: number;
  contact: Contact;

  constructor(
    private crudService: CrudService,
    private modalService: BsModalRef,
    private action: ActionService,
    private contactService: ContactService
    ) { }

  ngOnInit() {
    this.initForm();
    this.contactService.action.subscribe(contact => {
      this.contact = contact;
      
      if(contact.edited){
       this.prepareValuesEdit();
       this.buttonSubmit = false;
      }
    })
  }

  
  initForm = () => {
    this.sendForm = new FormGroup({
      contact: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
    });

    this.sendForm.get('contact').valueChanges.subscribe(val => {
      if(this.type === 'criar'){
      this.buttonSubmit = false
      } 
    });

    this.sendForm.get('email').valueChanges.subscribe(val => {
      if(this.type === 'criar'){
      this.buttonSubmit = false
      } 
    });
    this.sendForm.get('telephone').valueChanges.subscribe(val => {
      if(this.type === 'criar'){
      this.buttonSubmit = false
      }
    });

    if(this.type === "editar"){
      this.buttonSubmit = false;
      this.sendForm.get('contact').clearValidators()
    }
  }

  prepareValuesEdit() {
    this.sendForm.setValue({
      contact: this.contact.contact,
      email: this.contact.email,
      telephone: this.contact.telephone 
    });
  }

  onSubmit = () => {
    const data = this.sendForm.value;
    if(this.sendForm.valid){
      if(!this.contact.edited && !this.contact.deleted) {
        this.createContact(data);
      }
      if(this.contact.edited)
        this.editContact(data);
    }
  }

  createContact(data: FormData){
    const contactCreated = {...this.contact, created: true}
    this.crudService.create(data).pipe(
      finalize(() => {
        this.contactService.changeContact(contactCreated);
        this.close();
      })
    ).subscribe()
  }

  editContact(data){
    const contactCreated = {...this.contact, edited: true}
    this.crudService.update(this.contact.id, data)
      .pipe(
        finalize(() => {
          this.contactService.changeContact(contactCreated)
          this.close();
        })
      ).subscribe()
  }

  onDelete(){
    const contactDeleted = {...this.contact, deleted: true}
     this.crudService.delete(this.contact.id)
     .pipe(finalize(() => {
        this.contactService.changeContact(contactDeleted)
        this.close();
       })
     )
    .subscribe();
  }    

  close = () => {
    setTimeout(() => {
      this.modalService.hide();
    }, 700)
  }
}
