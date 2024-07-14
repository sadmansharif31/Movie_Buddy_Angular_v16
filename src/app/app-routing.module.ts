import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { ShowsListComponent } from './pages/shows-list/shows-list.component';
import { GenresComponent } from './pages/genres/genres.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shows-list/:type', component: ShowsListComponent },
  { path: 'detail/:iddeamake/:typedeamake', component: ShowDetailComponent }, // ? jokhon kono html class e [routerLink]="'detail/showItem.iddeamake/showItem.typedeamake'"
  // ? lekha tokhn e eita ShowDetailComponent e niye jabe and also id value tao pass korbe oi component e
  { path: 'genres/:genreId', component: GenresComponent},
  { path: 'genres', component: GenresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
