import { Component, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() shows: Movie[] = []; //! home.component.html theke input niche
  @Input() title = ''; //? home.component.html theke input niche
  @Input() showsType: 'tv' | 'movie' = 'movie';
}

//* ajke change korlam 7/07/2024
