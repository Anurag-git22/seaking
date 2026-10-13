import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
}

export const SEO = ({ title, description }: SEOProps) => {
  const fullTitle = `${title} | Sea King Boating Safari`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}
