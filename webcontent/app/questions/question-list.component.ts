import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Exam } from '../common/exam';
import { RouteExamService } from '../common/services/route-exam.service';
import { RouteDateService } from '../common/services/route-date.service';

@Component({
    templateUrl: './question-list.component.html',
    styleUrls: ['../common/css/common.css', './question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy{

  // public properties
  date: string = null;
  exam: Exam;
  uncollapsed: {[module:string]: boolean} = {};

  // private properties
  private examSubscription: Subscription = null;
  private dateSubscription: Subscription = null;
  
  constructor(
    private routeExamService: RouteExamService,
    private routeDateService: RouteDateService,
  ){};

  ngOnInit() {
    this.examSubscription =
      this.routeExamService.exam$.subscribe((exam:Exam) => this.exam = exam);
    this.dateSubscription =
      this.routeDateService.date$.subscribe((date:string) => this.date = date );
  };

  ngOnDestroy() {
    if (this.examSubscription) {
      this.examSubscription.unsubscribe();
    }
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }
};