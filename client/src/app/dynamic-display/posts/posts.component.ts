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
  posts: Post[] = []
  userId: string = ""
  constructor(private ar : ActivatedRoute, private srv: UsersUtilsService) { }

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
  }

}
