import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

  constructor() { }
  public action = new BehaviorSubject<Contact>({ id: 0, contact: null, email: null, telephone: null, deleted: false, edited: false, created: false });
  user = this.action.asObservable();

  changeContact(data: Contact){
    this.action.next(data);
  }
}