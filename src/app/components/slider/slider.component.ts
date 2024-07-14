import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit,Input } from '@angular/core';
import { imagesBaseUrl } from '../../constants/images-sizes';
import { Movie } from 'src/app/types/movie'


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})

export class SliderComponent implements OnInit {
  
  @Input() slides: Movie[] = []
  @Input() isHeader = false

  constructor() {}

  slideIndex = 0

  imagesBaseUrl = imagesBaseUrl

  ngOnInit() {
    if (!this.isHeader) {
      this.changeSlide();    //? eta ekhane deya mane ei method ta call hobe jokhn e ei class execute hobe
    }
  }


  changeSlide() {
    setInterval(() => {      //* set interval function takes 2 parameter (Callbacl function, Delay)
      this.slideIndex += 1;  //* ekhane call back function er modhe kono param deya hoy nai tai khali ase
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}


//! promise provides us the data when the complete data is ready

//? obserable ekbare data pathay na. It sends data in package or stream. Like first slot e 10 data user date gelo then 2nd slot e 10 gelo evabe.
//* obserable will only send data if there is someone to use that data. If no one to use data then it will not send any data. But promise will always send
//! data as it promises u some data. Obserable sends the data in chunks. It acts as a wrapper around the original data.



