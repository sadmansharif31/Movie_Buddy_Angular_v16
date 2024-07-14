import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesDto, Movie, GenresDto } from '../types/movie';
import { map, Observable } from 'rxjs';
import { VideosDto } from '../types/video';
import { ImagesDto } from '../types/image';
import { CreditsDto } from '../types/credits';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '8c247ea0b4b56ed2ff7d41c9a833aa77';

  constructor(private http: HttpClient) {}

  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`) // ! MovieDto is the data type.
      .pipe(map((data) => data.results.slice(0, count))); // ? .get initiates a http request and returns an obserable
  }
  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  getMovieVideos(id: string) {
    return this.http
      .get<VideosDto>(
        `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results)); //? here data theke amr just results lagbe tai data ke filter kore just result ber korlam
  }

  getMovieImages(id: string) {
    return this.http
      .get<ImagesDto>(
        `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops)); //? here data theke amr just backdrops lagbe tai data ke filter kore just result ber korlam
  }

  getMovieCast(id: string) {
    return this.http
      .get<CreditsDto>(
        `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}` //* ?aki_key is basically a query parameter.
      )
      .pipe(map((data) => data.cast)); //? here data theke amr just cast lagbe tai data ke filter kore just result ber korlam
  }

  getMovieSimilar(id: string) {
    return this.http
      .get<MoviesDto>(
        `${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, 12))); //? 6 ta col 2 ta row te total 12 ta movie show hobe.
  }

  searchMovies(page: number, searchValue?: string) {
    //* searchValue? optional. Na dileo cholbe but page no. must deya lagbe

    const uri = searchValue ? 'search/movie' : 'movie/popular'; //? search value thakle left option e jabe or else right option.
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}` //* "&page=" and "&api_key=" is basically a query parameter. '&' sign used to connect 2 params page and api key.
    );
  }

  getMovieGenres() {
    return this.http
      .get<GenresDto>(
        `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}` //* ?aki_key is basically a query parameter.
      )
      .pipe(map((data) => data.genres)); //? here data theke amr just cast lagbe tai data ke filter kore just result ber korlam
  }

  getMoviesByGenre(genreId: string, pageNumber = 1) {
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
    );
  }
}

// *.pipe is used to chain multiple operators. In this example, map is used. Use operators like map to manipulate data according to our need.

// ! asynchronous programming e http request block hoy na. Thats means suppose amr 5 ta line ase. Synchronous e code er
// ? first line execute hote jodi beshi time nei taile 2nd line derite execute hobe. But asynchronous first line execute
// * hoyar time ei background e 2nd 3rd 4th etc line execute hote thakbe so jokhn e 1st line execute hoya shesh hobe amr
// ! 2nd line ekdom sathe sathe execute hoye jabe since eita already agee thekei background e execute hochilo.
//? ispaginated is basically a query. Page number diye search kora jay basically.
