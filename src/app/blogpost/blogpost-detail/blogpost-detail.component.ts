import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrls: ['./blogpost-detail.component.css']
})
export class BlogpostDetailComponent implements OnInit {

  blog$: Blogpost;
  paramMap: any;
  blogId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogpostService: BlogpostService,
    private titleService: Title
  ) {
      this.route.params.subscribe(
      params => this.blogId = params.id) }

  ngOnInit() {

    this.blogpostService.getBlogById(this.blogId).subscribe(
      (data: Blogpost) => 
      this.blog$ = data)
      console.log(this.blog$);
      
    // this.blog$ = this.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.blogpostService.getBlogById(+params.get('id'))
    //   )
    // );
    this.titleService.setTitle('Blog Detail');
  }
}
