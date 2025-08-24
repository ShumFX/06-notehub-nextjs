import axios from "axios";
import type { Note } from "@/types/note";

interface FetchResponse {
  notes: Note[];
  totalPages: number;
}
// fetchNotes : має виконувати запит для отримання колекції нотатків із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
export async function fetchNotes(page: number = 1, search: string = "", perPage: number = 12): Promise<FetchResponse> {
    const response = await axios.get<FetchResponse>("https://notehub-public.goit.study/api/notes", //очікуємо дані формату FetchResponse
        {params: {page, search, perPage}, //GET-параметри (?page=1&search=&perPage=12)
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},} //авторизація на бекенд
    )
    return response.data; // повертає об’єкт з полем data, де є масив notes (для NoteList) та totalPages (для пагінації)
}
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді
export async function createNote(note: { title: string; content: string; tag: string }): Promise<Note> {
  const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", note,
  {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
}
//deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
        {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
        {headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`},}
  )
  return response.data;
} 