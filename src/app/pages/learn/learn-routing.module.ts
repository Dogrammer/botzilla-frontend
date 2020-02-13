import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LectionComponent } from './lection/lection.component';
import { CourseComponent } from './course/course.component';
import { LearnComponent } from './learn/learn.component';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      {
        path: 'courses',
        component: CourseComponent,
      },
      {
        path: 'lessons',
        component: LectionComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {
}