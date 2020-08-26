import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Contact } from '../../models/contact.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { finalize } from 'rxjs/operators';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  modalRef: BsModalRef;
  contacts: Contact[];
  deleted = false;

  alerts: any[] = [{
    type: 'success',
    msg:  'Contato excluído com sucesso!',
    timeout: 2000
  }];
 
  addAlert(): void {
    this.alerts.push({
      type: 'info',
      msg: 'Contato excluído com sucesso!',
      timeout: 2000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  constructor(
    private service: ApiService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.deleted = false;
    this.getAll()
  }

  editContact(id: number, type: string){
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.id = id;
  }

  delete(id: number, type){
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.id = id;
  }

  getAll = () => {
    this.service.getAll().subscribe(contact => {
      this.contacts = contact
    })
  }

  refresh(): void {
    setTimeout(() =>{
      window.location.reload();
    }, 1000)
  }
}
