import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const notehubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  total: number;
}

export interface FetchNotesParams {
  page: number;
  search: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search || undefined,
    },
  });

  return data;
};

export const createNote = async (
  newNote: CreateNotePayload
): Promise<Note> => {
  const { data } = await notehubApi.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await notehubApi.delete<Note>(`/notes/${id}`);
  return data;
};