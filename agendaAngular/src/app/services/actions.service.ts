import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActionService {

  constructor() { }
  public action = new BehaviorSubject<boolean>(false);
  cast = this.action.asObservable();

  changeContact(data){
    this.action.next(data);
  }
}