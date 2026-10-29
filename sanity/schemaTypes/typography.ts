import { defineType, defineField } from 'sanity'

export const typographySettings = defineType({
  name: 'typographySettings',
  title: 'Configuración de Tipografía',
  type: 'object',
  fields: [
    defineField({
      name: 'fontFamily',
      title: 'Google Font (Ej. Roboto, Inter, Playfair Display)',
      type: 'string',
      description: 'Ingresa el nombre exacto de la fuente de Google Fonts. Déjalo vacío para usar la tipografía predeterminada.',
    }),
    defineField({
      name: 'fontSize',
      title: 'Tamaño de Fuente (px)',
      type: 'number',
      initialValue: 12,
      description: 'Tamaño en píxeles.',
    }),
    defineField({
      name: 'isUppercase',
      title: 'Forzar Mayúsculas',
      type: 'boolean',
      initialValue: true,
      description: 'Transforma el texto a mayúsculas.',
    }),
  ],
})
