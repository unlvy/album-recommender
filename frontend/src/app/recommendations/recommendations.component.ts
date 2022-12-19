import { Component, OnInit } from '@angular/core';

import { RecommendationsService } from './recommendations.service';
import { Album } from '../albums/i-album';
import { AuthService } from '../auth/auth.service';
import { parseNumber } from '../number-parser';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  public recommendedAlbums: any[] = [];

  constructor(private authService: AuthService, private recsService: RecommendationsService) { }

  ngOnInit() {
    this.recsService.getRecommendedAlbums(this.authService.getUserID()).subscribe((res) => {
      JSON.parse(res.body).forEach((element: any) => {
        if (element.score > 0)
        this.recommendedAlbums.push({
          name: element.name,
          artist: element.artist,
          year: parseNumber(element.year),
          genres: element.genres,
          numTracks: parseNumber(element.numTracks),
          length: this.getLengthString(parseNumber(element.length.seconds)),
          imageUrl: element.imageUrl,
          score: element.score
        });
      });
    });
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
