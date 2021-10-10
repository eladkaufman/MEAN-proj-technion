import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { Todo } from '../todo';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UsersUtilsService {
  usersUrl: string = "http://localhost:8000/api/users/"
  todosUrl: string = "http://localhost:8000/api/todos/"
  postsUrl: string = "http://localhost:8000/api/posts/"
  sub1:Subscription = new Subscription();
  
  constructor(private http: HttpClient, private ar: ActivatedRoute){}
  
  getAllUsers(){
    return this.http.get<User[]>(this.usersUrl)
  }
  getUser(userId:string){
    return this.http.get<User[]>(this.usersUrl + userId)
  }
  updateUser(userId:string, updatedData: User)
  {
    return this.http.put<User[]>(this.usersUrl + userId, updatedData)
  }
  deleteUser(userId:string)
  {
    return this.http.delete(this.usersUrl + userId)
  }
  getUserTodos(userId:string){
    return this.http.get<Todo[]>(this.todosUrl + userId)
  }
  getUserPosts(userId:string){
    return this.http.get<Post[]>(this.postsUrl + userId)
  }
  markComplete(todoId:string){
    return this.http.put<any>(this.todosUrl + todoId, "")
  }
  addTodo(userId:string, todoObj:any){
    return this.http.post<any>(this.todosUrl + userId, todoObj)
  }
  addPost(userId:string, postObj:any){
    return this.http.post<any>(this.postsUrl + userId, postObj)
  }
  addUser(userObj:any){
    return this.http.post<any>(this.usersUrl, userObj)
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

}
