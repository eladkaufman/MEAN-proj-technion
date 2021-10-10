import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UsersUtilsService } from '../services/users-utils.service';
import { User } from '../user';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = []
  sub: Subscription = new Subscription()
  sub2: Subscription = new Subscription()
  searchKey: string = "";
  constructor(private srv: UsersUtilsService, private router: Router, private msg: MessageService) { 
    this.sub2 = this.msg.getUpdate().subscribe(x =>{
      if(x == true){
        this.sub = this.srv.getAllUsers().subscribe((data:User[])=>{this.users = data})
      }
    })
  }
  navToAddUser(){
    this.router.navigate([`/add-user`])
  }
  checkFiltered(user:User):boolean{
    const lowerName = user.name.toLowerCase()
    const lowerEmail = user.email.toLowerCase()
    const lowerSearchKey = this.searchKey.toLowerCase()
    return lowerName.includes(lowerSearchKey)||lowerEmail.includes(lowerSearchKey)
  }
  userDeleted(userId:string){
     const deletedUser:any = this.users.find(x => x._id == userId);
     this.users.splice(this.users.indexOf(deletedUser), 1);
  }
  ngOnInit(): void {
    this.sub = this.srv.getAllUsers().subscribe((data:User[])=>{this.users = data})
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }


}
