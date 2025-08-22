import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import css from './page.module.css';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch первую страницу заметок
  try {
    await queryClient.prefetchQuery({
      queryKey: ['notes', 1, ''],
      queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
    });
  } catch (error) {
    // Обработка ошибок prefetch - клиентский компонент покажет состояние ошибки
    console.error('Failed to prefetch notes:', error);
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Notes</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient />
        </HydrationBoundary>
      </div>
    </main>
  );
}