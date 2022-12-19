import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-create-artist-dialog',
  templateUrl: './create-artist-dialog.component.html',
  styleUrls: ['./create-artist-dialog.component.css']
})
export class CreateArtistDialogComponent {

  constructor(private dialogRef: MatDialogRef<CreateArtistDialogComponent>) { }

  public artistForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] })
  });

  public get artistFormName() { return this.artistForm.get('name'); }

  public onSubmit() {
    this.dialogRef.close(this.artistForm.value);
  }
}
