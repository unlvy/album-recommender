import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { AppGuard } from './app-guard';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { GenresComponent } from './genres/genres.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [AppGuard] },
  { path: 'artists', component: ArtistsComponent, canActivate: [AppGuard] },
  { path: 'genres', component: GenresComponent, canActivate: [AppGuard] },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AppGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
