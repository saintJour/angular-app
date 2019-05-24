import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  @Input() id: number; 

  courses: Course[];

  constructor(
    private courseSvc: CourseService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllBySemesterId(this.id)
    .subscribe(courses => {
      this.courses = courses;
    });
  }

}
