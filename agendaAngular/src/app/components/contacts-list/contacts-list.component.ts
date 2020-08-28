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
  contacts: Contact[];
  deleted = false;

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
    })
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
