import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { Genre, Movie, MoviesDto } from 'src/app/types/movie';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})

// *===================================== Routing Use Kore ========================================
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<MoviesDto> | null = null;
  genreId: string = ''; // Current genre ID

  constructor(private mservice: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.genres$ = this.mservice.getMovieGenres();

    this.route.params.subscribe((paramita) => {
      this.genreId = paramita['genreId'];
      this.loadShows();

      //this.shows$=this.mservice.getMoviesByGenre(this.genreId)
    });

    // ! ekhane jokhon e onno route e click korbo tokhn e subsciption triggered hobe. That means, ok the params has been changed.
    // * So, get the shows again. This was not possible with snapshot.params. So, we used subscription here. Although, ngOnInit is
    // ? executed only one time but the subscription will be executed whenever there is a change in the params. Eta use na kore jodi
    // ! genre te click kori taile always ekta genre er movie gulai show korbe. Click kore kore change korle oi ager genre er movie
    // * gulai show korbe. New genre er movie gula show korbe na. So better to use subscription instead of snapshot in this case.
  }

  loadShows() {
    this.shows$ = this.mservice.getMoviesByGenre(this.genreId, 1); //* Intitally page 1 e thakbe
  }

  pageBodlao(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
    // Assuming you want to reload shows with the updated page number
    this.shows$ = this.mservice.getMoviesByGenre(this.genreId, pageNumber); //*pageBodlao e click korle new page number ta loadshows() te pass kora hobe
  }
}

// *===================================== Click Use Kore ========================================

// export class GenresComponent implements OnInit {
//   genres$: Observable<Genre[]> | null = null;
//   shows$: Observable<MoviesDto> | null = null;
//   genreId: string = ''; // Current genre ID

//   constructor(private mservice: MoviesService) {}

//   ngOnInit(): void {

//     this.genres$ = this.mservice.getMovieGenres();
//   }

//   findByGenre(genreId: string, pageNumber = 1) { //* Initially just first page e show korbe. Next time page number barbe.
//     this.genreId = genreId;   //! genre er ID variable e store kortesi because pageBodlao er time e amr oi genId tai lagbe
//     this.shows$=this.mservice.getMoviesByGenre(genreId, pageNumber)

//   }

//   pageBodlao(event: PaginatorState) {
//     const pageNumber = event.page ? event.page + 1 : 1;
//     this.findByGenre(this.genreId, pageNumber); //! Initially jei genreId store hoyeche oitai ekhane abr pass hobe. Karon page change er time e genreId to same e thakbe.
//   }
// }
