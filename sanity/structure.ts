import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {EnvelopeIcon} from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Contenido')
    .items([
      orderableDocumentListDeskItem({type: 'category', title: 'Categorías', S, context}),
      S.listItem()
        .title('Proyectos por Categoría')
        .child(
          S.documentTypeList('category')
            .title('Selecciona una Categoría')
            .initialValueTemplates([])
            .child((categoryId) =>
              categoryId
                ? S.documentList()
                    .title('Proyectos')
                    .filter('_type == "portfolioProject" && category._ref == $categoryId')
                    .params({ categoryId })
                    .apiVersion('2024-01-01')
                    .initialValueTemplates([
                      S.initialValueTemplateItem('portfolioProject', {
                        category: { _type: 'reference', _ref: categoryId },
                      }),
                    ])
                : S.documentTypeList('portfolioProject')
            )
        ),

      S.divider(),

      // Carpeta de Menú: Configuración de Páginas (Singletons)
      S.listItem()
        .title('Configuración de Páginas')
        .child(
          S.list()
            .title('Configuración de Páginas')
            .items([
              S.listItem()
                .title('Home')
                .id('homeSettings')
                .child(
                  S.document()
                    .schemaType('homeSettings')
                    .documentId('homeSettings')
                    .title('Configuración Home')
                ),
              S.listItem()
                .title('About')
                .id('aboutSettings')
                .child(
                  S.document()
                    .schemaType('aboutSettings')
                    .documentId('aboutSettings')
                    .title('Configuración About')
                ),
              S.listItem()
                .title('Categorías (Global)')
                .id('categoryGlobalSettings')
                .child(
                  S.document()
                    .schemaType('categoryGlobalSettings')
                    .documentId('categoryGlobalSettings')
                    .title('Configuración Global de Categorías')
                ),
              S.listItem()
                .title('Connect')
                .id('connectSettings')
                .icon(EnvelopeIcon)
                .child(
                  S.document()
                    .schemaType('connectSettings')
                    .documentId('connectSettings')
                    .title('Configuración Connect')
                ),
            ])
        ),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'category',
            'portfolioProject',
            'homeSettings',
            'aboutSettings',
            'categoryGlobalSettings',
            'connectSettings',
          ].includes(listItem.getId() ?? '')
      ),
    ])
