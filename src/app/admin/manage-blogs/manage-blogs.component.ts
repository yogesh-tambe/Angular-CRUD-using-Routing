
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {
  [x: string]: any;

  title = 'Manage Blogs';
  blogs: Blog;
  error: string;
  message: string;
  blogIdToUpdate = null;
  dataSaved = false;
  blogForm:any;
  allBlogs:Observable<any>;

  pageTitle: string;
  uploadError: string;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
    this.blogService.getBlogs().subscribe(
      (data: Blog) => this.blogs = data,
      error => this.error = error
    );
    this.loadAllBlogs();
  }

  loadAllBlogs() {
    this.allBlogs = this.blogService.getAllBlogs();
  }

  // onFormSubmit() {
  //   this.dataSaved = false;
  //   let blog = this.blogForm.value;
  //   this.createBlog(blog);
  //   this.blogForm.reset();
  //   // this.loadAllBlogs();
  //   this.ngOnInit();
  // }

  // createBlog(blog: Blog) {
  //   if(this.blogIdToUpdate == null)
  //   {
  //     this.blogService.createBlog(blog).subscribe(
  //       () => {
  //         this.dataSaved = true;
  //         this.message = 'Record saved successfully';
  //         this.loadAllBlogs();
  //         this.blogIdToUpdate = null;
  //         // this.blogForm.reset();
  //         this.ngOnInit();

  //       }
  //     );
  //   } 
  //   else{
  //       blog.id = this.blogIdToUpdate;
  //       this.blogService.updateBlog(blog).
  //       subscribe(() => {
  //         this.dataSaved = true;
  //         this.message = 'Record saved successfully';
  //         this.loadAllBlogs();
  //         this.blogIdToUpdate = null;
  //         this.blogForm.reset();
  //         this.ngOnInit();
  //       });
  //   }
  // }

  loadBlogToEdit(blogId: string) {
    // console.log("from blog-form.component.ts");

    this.blogService.getBlogById(blogId).subscribe(blog => {
    this.message = null;
    this.dataSaved = false;
    this.blogIdToUpdate = blog.id;
    this.blogForm.controls['title'].setValue(blog.title);
    this.blogForm.controls['short_desc'].setValue(blog.short_desc);
    this.blogForm.controls['author'].setValue(blog.author);
    })
  }

  deleteBlog(blogId: string) {
    this.blogService.deleteBlogById(blogId).
    subscribe(() => {
      this.message = 'Record deleted successfully';
      // this.loadAllBlogs();
      this.blogIdToUpdate = null;
      this.ngOnInit();
      // this.blogForm.reset();
    }) 
  }
  
  resetForm() {
    this.blogForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
  // onDelete(id: number) {
  //   if (confirm('Are you sure want to delete id = ' + id)) {
  //     this.blogService.deleteBlog(+id).subscribe(
  //       res => {
  //         console.log(res);
  //         this.ngOnInit();
  //       },
  //       error => this.error = error
  //     );
  //   }
  // }
}
