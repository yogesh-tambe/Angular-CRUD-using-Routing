
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  dataSaved = false;
  blogForm:any;
  allBlogs:Observable<any>;
  blogIdToUpdate = null;
  message = null;

  pageTitle: string;
  error: string;
  uploadError: string;
  formData: FormData;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: [''],
      short_desc: [''],
      author: ['']
    });
    this.loadAllBlogs();
  }

  loadAllBlogs() {
    this.allBlogs = this.blogService.getAllBlogs();
  }

  onFormSubmit() {
    this.dataSaved = false;
    let blog = this.blogForm.value;
    this.createBlog(blog);
    this.blogForm.reset();
    this.loadAllBlogs();
    this.router.navigate(['/admin/blogs']);
  }

  createBlog(blog: Blog) {
    if(this.blogIdToUpdate == null)
    {
      this.blogService.createBlog(blog).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved successfully';
          this.loadAllBlogs();
          this.blogIdToUpdate = null;
          this.blogForm.reset();
          // this.router.navigate(['/admin/blogs']);
        }
      );
    } 
    else{
        blog.id = this.blogIdToUpdate;
        this.blogService.updateBlog(this.formData, blog).
        subscribe(() => {
          this.dataSaved = true;
          this.message = 'Record saved successfully';
          this.loadAllBlogs();
          this.blogIdToUpdate = null;
          this.blogForm.reset();
        });
    }
  }

  loadBlogToEdit(blogId: string) {
    console.log("from blog-form.component.ts");
    this.blogService.getBlogById(blogId).subscribe(blog => {
    this.message = null;
    this.dataSaved = false;
    this.blogIdToUpdate = blog.id;
    this.blogForm.controls['title'].setValue(blog.title);
    this.blogForm.controls['short_desc'].setValue(blog.short_desc);
    this.blogForm.controls['author'].setValue(blog.author);
  })
}

// deleteBlog(blogId: string) {
//   this.blogService.deleteBlogById(blogId).
//   subscribe(() => {
//     this.message = 'Record deleted successfully';
//     this.loadAllBlogs();
//     this.blogIdToUpdate = null;
//     this.blogForm.reset();
//   }) 
// }

resetForm() {
  this.blogForm.reset();
  this.message = null;
  this.dataSaved = false;
}
  
}
