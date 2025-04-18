import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './name-editor.component.html',
  styleUrl: './name-editor.component.css',
  standalone: true,
})
export class NameEditorComponent {
  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }
}
