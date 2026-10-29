import { type SchemaTypeDefinition, type Template } from 'sanity'
import { portfolioProject } from './project'
import { category } from './category'
import { typographySettings } from './typography'
import { homeSettings } from './homeSettings'
import { aboutSettings } from './aboutSettings'
import { categoryGlobalSettings } from './categoryGlobalSettings'
import { connectSettings } from './connectSettings'

export const schema: { 
  types: SchemaTypeDefinition[]
  templates?: (prev: Template[]) => Template[]
} = {
  types: [
    portfolioProject,
    category,
    typographySettings,
    homeSettings,
    aboutSettings,
    categoryGlobalSettings,
    connectSettings,
  ],
  templates: (prev) => [
    ...prev.filter(
      (t) =>
        !['portfolioProject', 'homeSettings', 'aboutSettings', 'categoryGlobalSettings', 'connectSettings'].includes(
          t.id
        )
    ),
    {
      id: 'portfolioProject',
      title: 'Proyectos',
      schemaType: 'portfolioProject',
      parameters: [{ name: 'category', type: 'reference' }],
      value: (params: any) => ({
        ...(params?.category ? { category: params.category } : {}),
      }),
    },
  ],
}
