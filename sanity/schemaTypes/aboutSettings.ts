import { defineType, defineField } from 'sanity'

export const aboutSettings = defineType({
  name: 'aboutSettings',
  title: 'Configuración About',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutText',
      title: 'Texto About',
      type: 'text',
      rows: 4,
      description: 'Párrafo principal de la página About.',
      initialValue:
        'CG Media Productions is a Miami based production house specializing in photography and film, with a focus on hospitality and lifestyle. Through thoughtful storytelling, creative collaboration, and refined execution, we create compelling visuals that capture the essence of each brand.',
    }),
    defineField({
      name: 'aboutTypography',
      title: 'Tipografía About',
      type: 'typographySettings',
    }),
    defineField({
      name: 'aboutImageDesktop',
      title: 'Imagen About (Desktop - Horizontal)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutImageMobile',
      title: 'Imagen About (Mobile - Vertical/Cuadrada)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración About',
      }
    },
  },
})
