import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';
import { Title } from '@angular/platform-browser';

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
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(private readonly postService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
