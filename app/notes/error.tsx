'use client';

export default function NotesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Ошибка при загрузке заметок 📒</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Попробовать снова</button>
    </div>
  );
}
