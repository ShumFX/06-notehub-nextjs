'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

const NoteDetailsClient: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatDate(note.createdAt)}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;