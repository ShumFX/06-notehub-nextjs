'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '../../lib/api';
import type { CreateNotePayload, NoteTag, Note } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
}

const NOTE_TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.mixed<NoteTag>().oneOf(NOTE_TAGS, 'Invalid tag').required('Tag is required'),
});

const initialValues: CreateNotePayload = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteForm: React.FC<NoteFormProps> = ({ onCancel }) => {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onMutate: async (newNote) => {
      // отмена текущих запросов
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      // optimistic update
      const prevNotes = queryClient.getQueryData<Note[]>(['notes', 1, '']);
      if (prevNotes) {
        queryClient.setQueryData(['notes', 1, ''], [...prevNotes, { id: Date.now(), ...newNote }]);
      }
      return { prevNotes };
    },
    onError: (_err, _newNote, context) => {
      if (context?.prevNotes) {
        queryClient.setQueryData(['notes', 1, ''], context.prevNotes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await createNoteMutation.mutateAsync(values);
        resetForm();
        onCancel();
      }}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form className={css.form} aria-busy={createNoteMutation.isPending}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
              aria-invalid={!isValid}
              autoFocus
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              aria-invalid={!isValid}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {NOTE_TAGS.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {createNoteMutation.isError && (
            <div className={css.error}>
              {createNoteMutation.error instanceof Error
                ? createNoteMutation.error.message
                : 'Failed to create note'}
            </div>
          )}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting || createNoteMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || createNoteMutation.isPending}
            >
              {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;

