'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const isDeletingThisNote =
          deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id;

        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            {note.content && <p className={css.content}>{note.content}</p>}
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <div className={css.actions}>
                <Link href={`/notes/${note.id}`} className={css.viewLink}>
                  View details
                </Link>
                <button
                  className={css.button}
                  onClick={() => handleDelete(note.id)}
                  disabled={isDeletingThisNote}
                >
                  {isDeletingThisNote ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
