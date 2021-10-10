import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersUtilsService } from '../services/users-utils.service';
import { Todo } from '../todo';
import { User } from '../user';
import { EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  userData:User = {name: "", email: ""}

  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>()

  otherDataOn:boolean = false
  sub: Subscription = new Subscription()
  sub2: Subscription = new Subscription()
  constructor(private srv: UsersUtilsService, private router: Router) { }
 
  areAllTodosCompleted(): boolean{
    if (this.userData.todos){
      if(this.userData.todos.length === 0) return false
      for (const todo of this.userData.todos){
        if (!todo.completed) return false;
      }
      return true
    }
    return true
  }
  navToUser(){
    this.router.navigate([`/user/${this.userData._id}`])
  }
  onSubmit(){
    this.sub = this.srv.updateUser(this.userData._id as string, this.userData)
    .subscribe(res =>{alert(res)})
  }
  delete(){
    this.notify.emit(this.userData._id)
    this.sub2 = this.srv.deleteUser(this.userData._id as string)
    .subscribe(res =>{alert(res)
      
    
    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}
