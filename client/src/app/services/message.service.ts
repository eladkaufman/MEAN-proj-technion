import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<boolean>()
  private selectedSubject = new Subject<string>()


  sendSelectedId(userId: string) {
    this.selectedSubject.next(userId);
}
  getSelectedId(): Observable<any> {
    return this.selectedSubject.asObservable();
  }
  updateList(toUpdate: boolean) {
    this.subject.next(toUpdate);
}
// clearMessages() {
//   this.subject.next();
// }

getUpdate(): Observable<any> {
  return this.subject.asObservable();
}

  constructor() { }
}
