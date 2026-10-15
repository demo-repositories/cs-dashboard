import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {TagIcon} from '@sanity/icons/Tag'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', icon: DocumentTextIcon, default: true},
    {name: 'meta', title: 'Meta', icon: TagIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().error('An article needs a headline.'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'Stable address used by analytics.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().error('Add a slug so this article can be tracked.'),
    }),
    defineField({
      name: 'dek',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'The standfirst under the headline.',
      validation: (rule) =>
        rule.max(220).warning('Keep the dek under 220 characters so the index stays scannable.'),
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      description: 'Lead image.',
    }),
    defineField({
      name: 'section',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Culture', value: 'culture'},
          {title: 'Opinion', value: 'opinion'},
          {title: 'Features', value: 'features'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Choose a section.'),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'meta',
      validation: (rule) => rule.required().error('Add the time this article was published.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
      publishedAt: 'publishedAt',
      media: 'image',
    },
    prepare({title, section, publishedAt, media}) {
      const when = typeof publishedAt === 'string' ? publishedAt.slice(0, 10) : undefined
      return {
        title: title || 'Untitled article',
        subtitle: [section, when].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
