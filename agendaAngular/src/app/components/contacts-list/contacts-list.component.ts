import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Contact } from '../../models/contact.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  modalRef: BsModalRef;
  contacts: Contact[];

  constructor(
    private service: ApiService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(contact => {
      console.log(contact)
      this.contacts = contact
    })
    
  }

  editContact(id: number, type: string){
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.id = id;
  }

}
