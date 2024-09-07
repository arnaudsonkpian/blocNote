import { Category } from './category';

export interface Note {
  id?: number; // id peut être undefined lors de la création
  title: string;
  content: string;
  category: Category; // Assurez-vous que 'category' est bien défini comme 'Category'
}
