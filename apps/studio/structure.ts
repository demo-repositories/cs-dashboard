import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio')
    .items([S.documentTypeListItem('article').title('Articles').icon(DocumentTextIcon)])
