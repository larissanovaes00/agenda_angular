import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContacAlltService {

  constructor() { }
  public data = new BehaviorSubject<Contact[]>([{ id: 0, contact: null, email: null, telephone: null, deleted: false, edited: false, created: false }]);
  user = this.data.asObservable();

  changeAllContacts(data: Contact[]){
    this.data.next(data);
  }

}