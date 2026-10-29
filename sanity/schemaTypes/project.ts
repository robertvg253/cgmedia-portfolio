import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const portfolioProject = defineType({
  type: 'document',
  name: 'portfolioProject',
  title: 'Proyectos',
  fields: [
    orderRankField({ type: 'portfolioProject' }),
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
      title: 'Descripción del Proyecto',
      type: 'text',
      rows: 3,
    }),
    defineField({
      type: 'reference',
      name: 'category',
      title: 'Category',
      to: [{ type: 'category' }],
    }),
    defineField({
      type: 'image',
      name: 'coverImage',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'projectVideo',
      title: 'Video del Proyecto (Opcional)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      type: 'array',
      name: 'gallery',
      title: 'Gallery',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'isArchived',
      title: 'Archivar Proyecto',
      type: 'boolean',
      description: 'Si se activa, este proyecto no aparecerá en el portafolio público.',
      initialValue: false,
    }),
  ],
})
