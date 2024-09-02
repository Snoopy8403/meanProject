import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = { title: this.enteredTitle, content: this.enteredContent };
    this.postCreated.emit(post);
  }
}
