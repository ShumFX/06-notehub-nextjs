
export type NoteID = string;


export type BaseNoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";


export type NoteTag = BaseNoteTag | (string & {});


export interface Note {
  id: NoteID;
  title: string;
  content?: string;   
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}


export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}
