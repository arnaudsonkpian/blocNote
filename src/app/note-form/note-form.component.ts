import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  note: Note = { title: '', content: '', category: { id: 0, name: '' } };
  newCategoryName: string = ''; 
  categories: Category[] = []; // Liste des catégories pour le sélecteur

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(+id).subscribe(note => this.note = note);
    }
    // Charger les catégories disponibles pour le sélecteur
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit(): void {
    if (this.note.id) {
      this.noteService.updateNoteById(this.note.id, this.note).subscribe(() => this.router.navigate(['/notes']));
    } else {
      this.noteService.createNote(this.note).subscribe(() => this.router.navigate(['/notes']));
    }
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }

  createCategory(): void {
    if (this.newCategoryName.trim()) {
      this.categoryService.createCategory({ name: this.newCategoryName }).subscribe(category => {
        if (category.id) { 
          this.categories.push(category); 
          this.note.category = category; 
          this.newCategoryName = ''; // 
        } else {
          // Gérez le cas où l'ID de la catégorie n'est pas défini (erreur de création)
          alert('Error: Category creation failed.');
        }
      });
    }
  }
}
