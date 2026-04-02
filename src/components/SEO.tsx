import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ title, description, image, url, type = 'website' }: SEOProps) => {
  const siteTitle = "Gowra's Blog";
  const defaultDescription = "Portfolio and Personal Blog of Gowra Pavan Kumar - Software Engineer & Full Stack Developer.";
  const defaultImage = "https://avatars.githubusercontent.com/u/160145497?v=4"; 
  const siteUrl = window.location.origin; // Automatically gets your site URL

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | {siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={url || window.location.href} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;