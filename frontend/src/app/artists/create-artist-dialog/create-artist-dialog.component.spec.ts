import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArtistDialogComponent } from './create-artist-dialog.component';

describe('CreateArtistDialogComponent', () => {
  let component: CreateArtistDialogComponent;
  let fixture: ComponentFixture<CreateArtistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArtistDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArtistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
