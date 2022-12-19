import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-create-album-dialog',
  templateUrl: './create-album-dialog.component.html',
  styleUrls: ['./create-album-dialog.component.css']
})
export class CreateAlbumDialogComponent {

  public selectedArtist = {};
  public selectedGenres = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateAlbumDialogComponent>) { }

  public albumForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    year: new FormControl('', { validators: [Validators.required] }),
    artist: new FormControl('', { validators: [Validators.required] }),
    genres: new FormControl('', { validators: [Validators.required] }),
    numTracks: new FormControl('', { validators: [Validators.required] }),
    hours: new FormControl('', { validators: [Validators.required] }),
    minutes: new FormControl('', { validators: [Validators.required] }),
    seconds: new FormControl('', { validators: [Validators.required] }),
    imageUrl: new FormControl('', { validators: [Validators.required] })
  });

  // + genres and artist

  public get albumName() { return this.albumForm.get('name'); }
  public get albumYear() { return this.albumForm.get('year'); }
  public get albumArtist() { return this.albumForm.get('artist'); }
  public get albumGenres() { return this.albumForm.get('genres'); }
  public get albumNumTracks() { return this.albumForm.get('numTracks'); }
  public get albumHours() { return this.albumForm.get('hours'); }
  public get albumMinutes() { return this.albumForm.get('minutes'); }
  public get albumSeconds() { return this.albumForm.get('seconds'); }
  public get albumImageUrl() { return this.albumForm.get('imageUrl'); }

  public onSubmit() {
    this.dialogRef.close(this.albumForm.value);
  }
}

