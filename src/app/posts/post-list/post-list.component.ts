import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../models/post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatIconButton,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSubs: Subscription = new Subscription();

  constructor(private readonly postService: PostsService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postsSubs = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubs.unsubscribe();
  }

  editPost() {}

  deletePost(postId: string) {
    this.postService.deletePost(postId);
  }
}
