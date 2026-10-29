import { defineType, defineField } from 'sanity'

export const homeSettings = defineType({
  name: 'homeSettings',
  title: 'Configuración Home',
  type: 'document',
  fields: [
    defineField({
      type: 'file',
      name: 'mobileVideo',
      title: 'Video (Mobile)',
      description: 'Sube el video de fondo para la versión móvil. Se reproducirá automáticamente.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      type: 'file',
      name: 'desktopVideo',
      title: 'Video (Desktop)',
      description: 'Sube el video de fondo para la versión de escritorio. Se reproducirá automáticamente.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'footerText',
      title: 'Texto del Footer',
      type: 'text',
      rows: 3,
      description: 'Párrafo descriptivo que se muestra en el footer antes del correo de contacto.',
      initialValue: 'We invite you to contact us with any questions or inquiries about your project, and we will respond as soon as possible. Thank you.',
    }),
    defineField({
      name: 'footerTypography',
      title: 'Tipografía del Footer',
      type: 'typographySettings',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración Home',
      }
    },
  },
})
