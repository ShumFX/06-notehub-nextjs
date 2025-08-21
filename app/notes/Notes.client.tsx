'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './Notes.module.css';

const PER_PAGE = 12;

const NotesClient: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: debouncedSearchQuery.trim() || undefined,
      }),
    keepPreviousData: true,
    placeholderData: (prev) => prev,
  });

  // Handlers
  const handlePageChange = useCallback((selectedPage: number) => {
    setCurrentPage(selectedPage + 1); // react-paginate -> 0-based
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Derived values
  const notes = useMemo(() => data?.notes ?? [], [data]);
  const totalPages = useMemo(() => data?.totalPages ?? 0, [data]);
  const shouldShowPagination = totalPages > 1;

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={css.error}>Error loading notes. Please try again.</div>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        {shouldShowPagination && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage - 1}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          + Create note
        </button>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <div className={css.empty}>No notes found. Try another search.</div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;

