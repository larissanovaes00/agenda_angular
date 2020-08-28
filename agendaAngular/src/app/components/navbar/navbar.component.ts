import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { ContacAlltService } from 'src/app/services/contactsAll.service';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  modalRef: BsModalRef;
  searchForms: FormGroup;
  contacts: Contact[] = [];
  contactsSource: Contact[] = [];

  constructor(
    private modalService: BsModalService,
    private allContacts: ContacAlltService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.allContacts.data.subscribe(res => {
      this.contacts = res;
    });
    this.contactsSource = Object.assign({}, this.contacts)
  }

  openModal(type: string){
    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.type = type;
  }

  initForm = () => {
    this.searchForms = new FormGroup({
      query: new FormControl(''),
    });

    this.searchForms.get('query').valueChanges.subscribe((query: string) => {
      const filter = this.contacts?.filter(x => x.contact?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      this.allContacts.changeAllContacts(filter);

      console.log('COPIA', this.contactsSource);
      console.log('ORIGINAL', this.contacts)
    })
  }
  
}


