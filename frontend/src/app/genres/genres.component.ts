import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { GenresService } from './genres.service';
import { AuthService } from '../auth/auth.service';
import { Genre } from './i-genre';
import { CreateGenreDialogComponent } from './create-genre-dialog/create-genre-dialog.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {

  public genres: Genre[] = [];

  constructor(private genresService: GenresService, private auth: AuthService, private dialog: MatDialog) { }

  async ngOnInit() {
    await this.updateGenres();
  }

  public async likeGenre(genreID: string) {
    await lastValueFrom(this.genresService.likeGenre(this.auth.getUserID(), genreID));
    await this.updateGenres();
  }

  public async dislikeGenre(genreID: string) {
    await lastValueFrom(this.genresService.dislikeGenre(this.auth.getUserID(), genreID));
    await this.updateGenres();
  }

  public createGenre(): void {
    const dialogRef = this.dialog.open(CreateGenreDialogComponent);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          (async () => {
            await lastValueFrom(this.genresService.createGenre(data.name));
            this.updateGenres();
          })();
        }
      }
    )
  }

  private async updateGenres() {
    let res = await lastValueFrom(this.genresService.getGenres());
    this.genres = [];
    this.genres.push(...JSON.parse(res.body));

    res = await lastValueFrom(this.genresService.getLikedGenres(this.auth.getUserID()));
    JSON.parse(res.body).forEach((element: any) => {
      const genre = this.genres.find(item => item.id === element.id);
      if (genre) { genre.isLiked = true; }
    });
  }

}
