'use client';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error }: ErrorPageProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}