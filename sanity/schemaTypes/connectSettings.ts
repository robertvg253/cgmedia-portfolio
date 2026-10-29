import { defineType, defineField } from 'sanity'

export const connectSettings = defineType({
  name: 'connectSettings',
  title: 'Configuración de Connect',
  type: 'document',
  fields: [
    defineField({
      name: 'connectText',
      title: 'Texto Principal de Connect',
      type: 'text',
      rows: 4,
      description: 'Párrafo descriptivo principal en la página Connect.',
      initialValue:
        'WE COLLABORATE WITH VISIONARY BRANDS AND CREATORS WORLDWIDE. TELL US ABOUT YOUR PROJECT OR UPCOMING PRODUCTION.',
    }),
    defineField({
      name: 'connectTypography',
      title: 'Configuración Tipográfica',
      type: 'typographySettings',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración de Connect',
      }
    },
  },
})
