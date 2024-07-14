import { Movie, MoviesDto } from './movie';

export type Tvshow = {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
};

export type TvshowsDto = {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
};

export function mapToMovies(tvshows: Tvshow[]): Movie[] { //* Eita ekta Tvshow array type object ke niye ekta Movie type array object e convert kore.
  return tvshows.map((tvshow: Tvshow) => {  // ! for every tvshow in tvshows.                              
    return {
      ...tvshow, // ? baki shob property same thakbe as it was in movies type.ts
      title: tvshow.name, // ! Since amra Movie type return korbo so amdr ke Movie type er object er variable gulai use kora lagbe ekhane.
      original_title: tvshow.original_name, // * But only original title and title ta change hobe
    };
  });
}

export function mapToMovie(tvshow: Tvshow): Movie {    //* Eita ekta single Tvshow object ke niye ekta single Movie object e convert kore.
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
  };
}

export function mapToMoviesDto(tvshowDto: TvshowsDto): MoviesDto {
  return {
    results: tvshowDto.results.map(mapToMovie),
    total_pages: tvshowDto.total_pages,
    total_results: tvshowDto.total_results,
    page: tvshowDto.page,
  };
}
