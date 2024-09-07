import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe(
      notes => {
        this.notes = notes;
        console.log('Notes retrieved successfully:', notes); // Vérifiez les données récupérées
      },
      error => console.error('Error retrieving notes:', error) // Affiche l'erreur en cas de problème
    );
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNoteById(id).subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== id);
      });
    }
  }
}
