import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string = '';
  private post: Post = {
    id: '',
    title: '',
    content: '',
  };

  constructor(
    private readonly postService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
