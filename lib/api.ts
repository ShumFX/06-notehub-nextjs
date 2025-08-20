import axios, { type AxiosResponse } from 'axios';
import type { Note, CreateNotePayload } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
  currentPage: number;
  perPage: number;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  note: Note;
}

export interface FetchNoteByIdResponse {
  note: Note;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search?.trim()) {
    queryParams.append('search', search.trim());
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get(
    `/notes?${queryParams.toString()}`
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<FetchNoteByIdResponse> = await api.get(`/notes/${id}`);
  return response.data.note;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<CreateNoteResponse> = await api.post('/notes', payload);
  return response.data.note;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(`/notes/${id}`);
  return response.data.note;
};

// удобный общий экспорт
export const apiClient = {
  fetchNotes,
  fetchNoteById,
  createNote,
  deleteNote,
};
