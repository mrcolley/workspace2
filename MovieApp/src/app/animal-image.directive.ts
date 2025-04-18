import { Directive, Input, OnChanges, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAnimalImage]',
  standalone: true
})
export class AnimalImageDirective {

  constructor() { }
  @Input() animalName: string = "";
  @HostBinding('src') imageSource = "";

  ngOnChanges() {
    this.imageSource = '../assets/default.png';
    if (this.animalName.indexOf('dog') > -1)
      this.imageSource = '../assets/dog.png';
    if (this.animalName.indexOf('cat') > -1)
      this.imageSource = '../assets/cat.png';
  }
}