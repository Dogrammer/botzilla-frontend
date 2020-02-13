import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { CourseComponent } from './course/course.component';
import { LectionComponent } from './lection/lection.component';
import { QuizComponent } from './quiz/quiz.component';
import { LearnComponent } from './learn/learn.component';

@NgModule({
  declarations: [CourseComponent, LectionComponent, QuizComponent, LearnComponent],
  imports: [
    CommonModule,
    LearnRoutingModule
  ]
})
export class LearnModule { }
