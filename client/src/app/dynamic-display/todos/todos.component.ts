import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Todo } from 'src/app/todo';
import { UsersUtilsService } from '../../services/users-utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  sub:Subscription = new Subscription();
  sub2:Subscription = new Subscription();
  sub3:Subscription = new Subscription();
  todos: Todo[] = []
  userId: string = ""
  newTitle:string = ""
  addingTodo: boolean = false
  constructor(private ar : ActivatedRoute, private srv: UsersUtilsService, private msg: MessageService) { }

  markComplete(todoId:string){
    const completedTodo:any = this.todos.find(x=>x._id == todoId)
    this.todos[this.todos.indexOf(completedTodo)].completed = true;
    this.sub2 = this.srv.markComplete(todoId).subscribe(data => {
      this.msg.updateList(true)
    })

  }
  onSubmit(){
 
    this.sub3 = this.srv.addTodo(this.userId, {title: this.newTitle, completed: false}).subscribe(data=> 
      {console.log(data)
        
        this.sub = this.srv.getUserTodos(this.userId).subscribe(data =>{
          this.todos = data
        })
      
      })
    this.addingTodo = false;
  }

  ngOnInit(): void {
    this.ar.params.subscribe(data => 
      {
        this.userId = data["id"];

        this.sub = this.srv.getUserTodos(this.userId).subscribe(data =>{
          this.todos = data
        })
      })
      console.log(this.newTitle)
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }

}
