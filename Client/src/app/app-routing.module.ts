import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'Member', component: MemberListComponent },
      { path: 'Member/:id', component: MemberDetailComponent },
      { path: 'Lists', component: ListsComponent },
      { path: 'Messages', component: MessagesComponent },
    ]
  },

  { path: '**', component: HomeComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
