import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {NameEditorComponent} from './name-editor/name-editor.component';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [
    NameEditorComponent,
    AppComponent,
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppComponent,
    NameEditorComponent,
    ReactiveFormsModule, 
    FormControl,
    CommonModule
  ],
  providers: [],
  //bootstrap: [AppComponent],
})
export class AppModule {}