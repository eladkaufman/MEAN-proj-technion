import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/post';
import { UsersUtilsService } from '../../services/users-utils.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  sub:Subscription = new Subscription();
  sub2:Subscription = new Subscription();
  posts: Post[] = []
  userId: string = "";
  addingPost: boolean = false;
  newTitle:string = "";
  newBody:string = "";

  constructor(private ar : ActivatedRoute, private srv: UsersUtilsService) { }
  
  onSubmit(){
 
    this.sub2 = this.srv.addPost(this.userId, {title: this.newTitle, body: this.newBody}).subscribe(data=> 
      {
        this.sub = this.srv.getUserPosts(this.userId).subscribe(data =>{
          this.posts = data
        })
      })
    this.addingPost = false
  }
  ngOnInit(): void {
    this.ar.params.subscribe(data => 
      {
        this.userId = data["id"];

        this.sub = this.srv.getUserPosts(this.userId).subscribe(data =>{
          this.posts = data
        })
      })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

}
