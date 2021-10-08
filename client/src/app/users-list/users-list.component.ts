import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersUtilsService } from '../services/users-utils.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = []
  sub: Subscription = new Subscription()
  searchKey: string = "";
  constructor(private srv: UsersUtilsService) { }

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
    this.sub = this.srv.getAllUsers().subscribe((data:User[])=>{this.users = data
    console.table(this.users)
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


}
