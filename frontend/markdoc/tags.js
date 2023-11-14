import { Callout } from '@/components/Callout'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { CardDoughnut } from '@/components/Cards/CardDoughnut'
import  CardTableSearchReference  from '@/components/Cards/CardTableSearchReference'
import  TableSearchStamp  from '@/components/DetailStamp/TableSearchStamp'
import  TableSearchPendings  from '@/components/RecentComment/TableSearchPendings'
import  TableSearchComments  from '@/components/RecentComment/TableSearchComments'
import  {CatalogView}  from '@/components/Catalog/CatalogView'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  'card-doughnut': {
    render: CardDoughnut,
  },
  
 
  'card-reference': {
     render: CardTableSearchReference,
    
  },

  'filterstable-stamps': {
    render: TableSearchStamp,
   
 },

 'recent-pendings': {
  render: TableSearchPendings,
 
},

'recent-comments': {
  render: TableSearchComments,
 
},

'catalog-view': {
  render: CatalogView,
 
},

 
}

export default tags
