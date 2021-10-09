import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  todos: Todo[] = []
  userId: string = ""
  constructor(private ar : ActivatedRoute, private srv: UsersUtilsService) { }

  markComplete(todoId:string){
    const completedTodo:any = this.todos.find(x=>x._id == todoId)
    this.todos[this.todos.indexOf(completedTodo)].completed = true;
    this.sub2 = this.srv.markComplete(todoId).subscribe(data => {})

  }
  ngOnInit(): void {
    this.ar.params.subscribe(data => 
      {
        this.userId = data["id"];

        this.sub = this.srv.getUserTodos(this.userId).subscribe(data =>{
          this.todos = data
        })
      })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}
