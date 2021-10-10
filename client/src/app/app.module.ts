import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DynamicDisplayComponent } from './dynamic-display/dynamic-display.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TodosComponent } from './dynamic-display/todos/todos.component';
import { PostsComponent } from './dynamic-display/posts/posts.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
                          {path: "user/:id", component: DynamicDisplayComponent},
                          {path: "add-user", component: AddUserComponent},

                        ];
@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    DynamicDisplayComponent,
    UserComponent,
    TodosComponent,
    PostsComponent,
    AddUserComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
