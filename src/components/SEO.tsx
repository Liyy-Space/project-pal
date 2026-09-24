import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title: string;
  description: string;
  path?: string; // e.g. "/about" — omit for homepage
  image?: string; // defaults to the site OG image
}

const SITE_URL = "https://www.neu-data.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const SEO = ({ title, description, path = "", image = DEFAULT_IMAGE }: SEOProps) => {
  const { i18n } = useTranslation();
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Neudata`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === "vi" ? "vi_VN" : "en_US"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang alternates for EN/VN */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="vi" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};

export default SEO;
