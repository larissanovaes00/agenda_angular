import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Contact } from '../../models/contact.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { ContactService } from 'src/app/services/contact.service';
import { ContacAlltService } from 'src/app/services/contactsAll.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  
  modalRef: BsModalRef;
  contacts: Contact[] = [];
  deleted = false;

  colors = ['#68a0fa', '#90d26c', '#2a2d3b', '#9198af','#c0c3d2', '#dbff90', '#e4e7f4', '#fa7268', '#FF948C']

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
    private allContacts: ContacAlltService,
    private contactService: ContactService
  ) { }

 
  ngOnInit(): void {
    this.getAll();
    this.allContacts.data.subscribe(contact => {
      this.contacts = contact;
    })
    this.contactService.action.subscribe(contact => {
      if(contact.created || contact.edited || contact.deleted){
        this.getAll();
      }
      if(contact.created){
      }
    })  
  }
  
  getColorRandom(){
    const random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  }  

  editContact(contact: Contact, type: string) {
    const contactEdited = {...contact, edited: true };
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
    this.contactService.changeContact(contactEdited)
  }

  delete(contact: Contact, type: string) {
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
    this.contactService.changeContact(contact)    
  }

  getAll = () => {
    this.crudService.getAll().subscribe(res => {
      this.allContacts.changeAllContacts(res)
      
    })
  }
}
