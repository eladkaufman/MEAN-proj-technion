import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { UsersUtilsService } from '../services/users-utils.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private srv: UsersUtilsService, private router: Router, private msg: MessageService) { }
  sub: Subscription = new Subscription();
  userName: string = ""
  userEmail: string = ""

  onSubmit(){
    this.sub = this.srv.addUser({name: this.userName, email: this.userEmail})
    .subscribe(data =>{

      this.msg.updateList(true);
      this.router.navigate([`/`])
    })
  }
  navToMain(){
    this.router.navigate([`/`])
  }

  ngOnInit(): void {
  }

}
