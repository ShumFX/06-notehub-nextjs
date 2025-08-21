'use client';

import { useState } from 'react';
import NoteList from '@components/NoteList/NoteList';

export default function NotesClient() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <NoteList page={page} onPageChange={setPage} />
    </div>
  );
}



