//Кожен об'єкт типу Note повинен мати такі поля з вказаними типами даних:
export interface Note { 
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}
// NoteTag може бути лише одним із цих рядків:
export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";