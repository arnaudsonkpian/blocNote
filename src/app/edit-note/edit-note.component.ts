import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  note: any = {
    title: '',
    content: '',
    category: { name: '' }
  };

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.noteService.getNoteById(id).subscribe(response => {
      this.note = response;
    });
  }

  updateNote(): void {
    this.noteService.updateNoteById(this.note.id, this.note).subscribe(() => {
      this.router.navigate(['/view-notes']);
    });
  }
}
