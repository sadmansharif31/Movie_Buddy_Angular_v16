import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Movie } from 'src/app/types/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { mapToMovie, mapToMovies } from 'src/app/types/tvshow';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Video } from 'src/app/types/video';
import { Image } from 'src/app/types/image';
import { Actor } from 'src/app/types/credits';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  showType: 'tv' | 'movie' = 'movie';
  

  show$: Observable<Movie> | null = null;
  showVideos$: Observable<Video[]> | null = null;
  showImages$: Observable<Image[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;
  similarShows$: Observable<Movie[]> | null= null;

  imagesSizes = IMAGES_SIZES;

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private tvService: TvshowsService
  ) {}

  ngOnInit() {
    // !=======================STEP-1 of extracting data throught Rounting=================================

    //? main function subscribe & call back function hola

    const hola = (np: Params) => {
      this.showId = np['iddeamake']; //* app.route eo ei same 'iddeamake' name tai likhte hobe
    };

    this.router.params.subscribe(hola); //* jokhn e param object emit korbe sheta callback function (hola) te argument hishebe pass hbe

    // !=======================STEP-2 of extracting data throught Rounting=================================

    this.showType = this.router.snapshot.params['typedeamake'];

    // !=======================STEP-3 of extracting data throught Rounting=================================

    // this.router.params.subscribe((paramita) => {
    //   this.showId = paramita['iddeamake']
    // })

    // ?===================================================================================================

    if (this.showType === 'movie') {
      this.show$ = this.moviesService.getMovieById(this.showId);
      this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
      this.showImages$=this.moviesService.getMovieImages(this.showId);
      this.showCast$=this.moviesService.getMovieCast(this.showId)
      this.similarShows$=this.moviesService.getMovieSimilar(this.showId)
    }
    if (this.showType === 'tv') {
      this.showVideos$ = this.tvService.getTvShowVideos(this.showId);
      this.showImages$=this.tvService.getTvShowImages(this.showId);
      this.showCast$=this.tvService.getTvShowCast(this.showId);
      this.show$ = this.tvService
        .getTvShowById(this.showId)  //* here we get an single object of Movie after mapping Tvshows to movies.
        .pipe(map(mapToMovie));

      this.similarShows$ = this.tvService
        .getTvShowSimilar(this.showId)
        .pipe(map(mapToMovies));   //* here we get an array object of Movie[] after mapping Tvshows to movies.
    }
  }
}

//? this.router er through te jei value pabo oita always obserables hobe. So, params is a observable
//? The subscription includes a callback function that is executed whenever the params observable emits a new value.
//? For example, if the user navigates to the route /detail/123, the params object might look like { iddeamake: '123' }.
//? and it emits a value. Oi value er modhe theke amra id the ber kore variable e store kore dei.

//! Explanation

//* Defining the Callback Function (hola):
//* const hola = (np: Params) => { ... }: Here, hola is a callback function that
//* accepts a parameter np of type Params. This type comes from the @angular/router package
//* and represents an object containing route parameters.
//* Subscribing to the params Observable:

//* this.router.params.subscribe(hola);: This line subscribes to the params observable
//* provided by ActivatedRoute. The params observable emits an object (Params) whenever the route parameters change.
//* The hola function is passed as an argument to subscribe, indicating that it should
//* be called whenever new values (route parameters) are emitted by the params observable.

//! Clarification

//? Observable Type: The params itself is an observable. It's not being passed as a type to hola but rather
//? hola is a function that expects an object of type Params (which is emitted by the observable).
//? Subscription: By subscribing to the params observable and passing hola, you're
//? instructing Angular to call hola with new route parameters (np) whenever the route parameters change.

//! .Subscribe

//? .subscribe is called on the observable instance.
//? It takes a function as its first argument ((value) => {this.showId=value['id']}),
//? which handles emitted values by the params.
//? Optionally, you can provide a second function for handling errors ((error) => {console.log(Vai error dei)})
//? and a third function for handling the completion of the observable (() => console.log(...)).
