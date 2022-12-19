import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenreDialogComponent } from './create-genre-dialog.component';

describe('CreateGenreDialogComponent', () => {
  let component: CreateGenreDialogComponent;
  let fixture: ComponentFixture<CreateGenreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGenreDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
