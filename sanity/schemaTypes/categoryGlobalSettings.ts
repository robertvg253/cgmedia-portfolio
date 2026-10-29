import { defineType, defineField } from 'sanity'

export const categoryGlobalSettings = defineType({
  name: 'categoryGlobalSettings',
  title: 'Configuración Global de Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'titleTypography',
      title: 'Tipografía del Título',
      type: 'typographySettings',
      description: 'Estilo tipográfico para el título en todas las vistas de categoría.',
    }),
    defineField({
      name: 'descriptionTypography',
      title: 'Tipografía de la Descripción',
      type: 'typographySettings',
      description: 'Estilo tipográfico para la descripción en todas las vistas de categoría.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración Global de Categorías',
      }
    },
  },
})
