import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ArtistsService } from './artists.service';
import { AuthService } from '../auth/auth.service';
import { Artist } from './i-artist';
import { CreateArtistDialogComponent } from './create-artist-dialog/create-artist-dialog.component';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  
  public artists: Artist[] = [];

  constructor(private artistsService: ArtistsService, private auth: AuthService, private dialog: MatDialog) { }

  async ngOnInit() {
    await this.updateArtists();
  }

  public async likeArtist(artistID: string) {
    await lastValueFrom(this.artistsService.likeArtist(this.auth.getUserID(), artistID));
    await this.updateArtists();
  }

  public async dislikeArtist(artistID: string) {
    await lastValueFrom(this.artistsService.dislikeArtist(this.auth.getUserID(), artistID));
    await this.updateArtists();
  }

  public createArtist(): void {
    const dialogRef = this.dialog.open(CreateArtistDialogComponent);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          (async () => {
            await lastValueFrom(this.artistsService.createArtist(data.name));
            this.updateArtists();
          })();
        }
      }
    )
  }

  private async updateArtists() {
    let res = await lastValueFrom(this.artistsService.getArtists());
    this.artists = [];
    this.artists.push(...JSON.parse(res.body));

    res = await lastValueFrom(this.artistsService.getLikedArtists(this.auth.getUserID()));
    JSON.parse(res.body).forEach((element: any) => {
      const artist = this.artists.find(item => item.id === element.id);
      if (artist) { artist.isLiked = true; }
    });
  }

}
