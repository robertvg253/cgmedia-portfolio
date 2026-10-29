import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const category = defineType({
  type: 'document',
  name: 'category',
  title: 'Categorías (Nichos)',
  fields: [
    orderRankField({ type: 'category' }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción de la Categoría',
      type: 'text',
      description: 'Texto que aparece debajo del título en la vista de categoría',
    }),
  ],
})
