import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie, MoviesDto } from 'src/app/types/movie';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { mapToMoviesDto } from 'src/app/types/tvshow';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})


export class ShowsListComponent implements OnInit {
  showsList$: Observable<MoviesDto> | null = null;
  searchValue = '';
  showsType: 'movie' | 'tv' = 'movie';

  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvshowsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.showsType = this.route.snapshot.params['type']; //! snapshot use korte partam but it's better to use subscription inside ogOnInit

    this.route.params.subscribe((paramita) => {
      this.showsType = paramita['type']
    });

    this.getPagedShows(this.showsType, 1); //* ngOnInit er modhe jeta thkabe oita always call hobe jokhn e ei class initialize hobe.
  }

  getPagedShows(
    showsType: 'movie' | 'tv',
    page: number,
    searchKeyword?: string
  ) {
    if (showsType === 'movie') {
      this.showsList$ = this.moviesService.searchMovies(page, searchKeyword);
    }
    if (showsType === 'tv') {
      this.showsList$ = this.tvShowsService
        .searchTvShows(page, searchKeyword)
        .pipe(map(mapToMoviesDto));
    }
  }

  searchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue);
  }

  pageBodlao(event: PaginatorState) {
    //* event is a paginator type
    const pageNumber = event.page ? event.page + 1 : 1;  //? jodi event.page defined hoy taile pagenumber= even.page+1 hobe or else just pagnumber= 1 hobe
    this.getPagedShows(this.showsType, pageNumber, this.searchValue);  //* search value ta deya lagbe karon searchMovies e dhuke check kore dekhbe je searchValue ase naki nai
  } //! jodi searchValue thake taile oitakei beshi priority deya hobe and "uri" change hoye "search/movie" hoye jabe .
} //* See movieService.searchMovie() for understanding.




//? showsType ekta extra parameter deya hoyeche so that movie and series duita alada vabe search kora jay.
//! if (event.page !== undefined): The condition ensures that the page property exists and is not undefined or null. This prevents calling getPagedShows
//* with an invalid page value. this.getPagedShows(event.page): Calls the getPagedShows method with the current page number from the paginator event.


