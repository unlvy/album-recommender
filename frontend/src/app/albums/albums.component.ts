import { Component } from '@angular/core';
import { AlbumsService } from './albums.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../auth/auth.service';
import { Album } from './i-album';
import { parseNumber } from '../number-parser';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';
import { Artist } from '../artists/i-artist';
import { Genre } from '../genres/i-genre';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {

  public albums: Album[] = [];
  private artists: Artist[] = [];
  private genres: Genre[] = [];

  constructor(private albumsService: AlbumsService, private auth: AuthService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.getGenresAndArtists();
    this.updateAlbums();
  }

  public rateAlbum(albumID: string): void {
    const album = this.albums.find(item => item.id === albumID);
    if (!album) { return; }
    const rating = album.tempUserRating;
    if (rating) {
      console.log(album);
      if (album.userRating) {
        this.albumsService.changeAlbumRating(this.auth.getUserID(), albumID, rating).subscribe({
          next: () => { this.updateAlbums(); },
          error: (err) => { console.log(err); }
        });
      } else {
        this.albumsService.rateAlbum(this.auth.getUserID(), albumID, rating).subscribe({
          next: () => { this.updateAlbums(); },
          error: (err) => { console.log(err); }
        });
      }
    }
  }

  private async updateAlbums() {
    let res = await lastValueFrom(this.albumsService.getAlbums());
    this.albums = [];
    JSON.parse(res.body).forEach((element: any) => {
      this.albums.push({
        id: element.id,
        name: element.name,
        artist: element.artist,
        year: parseNumber(element.year),
        genres: element.genres,
        numTracks: parseNumber(element.numTracks),
        length: this.getLengthString(parseNumber(element.length.seconds)),
        imageUrl: element.imageUrl,
        averageRating: (element.averageRating ? parseNumber(element.averageRating) : undefined),
        userRated: false
      });
    });

    res = await lastValueFrom(this.albumsService.getAlbumsUserRatings(this.auth.getUserID()));
    JSON.parse(res.body).forEach((element: any) => {
      const album = this.albums.find(item => item.id === element.id);
      if (album) { album.userRating = parseNumber(element.userRating); album.userRated = true; }
    });
  }

  public changeRating(albumID: string): void {
    const album = this.albums.find(item => item.id === albumID);
    if (album) {
      album.userRated = false;
    }
  }

  public createAlbum(): void {
    const dialogRef = this.dialog.open(CreateAlbumDialogComponent, {
      data: {
        genres: this.genres,
        artists: this.artists
      }
    });
    dialogRef.afterClosed().subscribe(
      (newAlbum) => {
        if (newAlbum) {
          (async () => {
            newAlbum.artistID = newAlbum.artist.id;
            newAlbum.genresIDs = [];
            newAlbum.genres.forEach((element: any) => {
              newAlbum.genresIDs.push(element.id);
            }); 
            await lastValueFrom(this.albumsService.createAlbum(newAlbum));
            this.updateAlbums();
          })();
        }
      }
    )
  }

  public getGenresAndArtists(): void {
    this.albumsService.getArtists().subscribe((res) => { this.artists.push(...JSON.parse(res.body)); });
    this.albumsService.getGenres().subscribe((res) => { this.genres.push(...JSON.parse(res.body)); });
  }

  private getLengthString(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs - (h * 3600)) / 60);
    const s = secs - (h * 3600) - (m * 60);

    let hours: string = <string><unknown>(h);
    let minutes: string = <string><unknown>(m);
    let seconds: string = <string><unknown>(s);

    if (h < 10) { hours = '0' + h; }
    if (m < 10) { minutes = '0' + m; }
    if (s < 10) { seconds = '0' + s; }

    return (h == 0) ? (minutes + ':' + seconds) : (hours + ':' + minutes + ':' + seconds);
  }

}
