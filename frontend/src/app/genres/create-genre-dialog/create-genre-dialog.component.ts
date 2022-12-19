import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-create-genre-dialog',
  templateUrl: './create-genre-dialog.component.html',
  styleUrls: ['./create-genre-dialog.component.css']
})
export class CreateGenreDialogComponent {

  constructor(private dialogRef: MatDialogRef<CreateGenreDialogComponent>) { }

  public genreForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] })
  });

  public get genreFormName() { return this.genreForm.get('name'); }

  public onSubmit() {
    this.dialogRef.close(this.genreForm.value);
  }
}
