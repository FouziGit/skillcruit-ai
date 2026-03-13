import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
  ogImage?: string;
}

export const SEOHead = ({ title, description, canonical, jsonLd, ogImage }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    if (ogImage) setMeta("og:image", ogImage, true);
    if (canonical) setMeta("og:url", canonical, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    if (jsonLd) {
      const existingScript = document.querySelector('script[data-seo="jsonld"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "jsonld");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [title, description, canonical, jsonLd, ogImage]);

  return null;
};

// JSON-LD schemas
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Skillcruit",
  "url": "https://skillcruit.fr",
  "description": "Présélection intelligente de candidats pour recruteurs. Analyse CV, scoring automatique, matching.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://skillcruit.fr/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Skillcruit",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Skillcruit est une solution SaaS qui automatise la présélection de candidats. Grâce au NLP contextuel, elle analyse le sens des CV, génère un scoring objectif et classe automatiquement les candidatures.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
  },
  "provider": {
    "@type": "Organization",
    "name": "Skillcruit",
    "url": "https://skillcruit.fr",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "10",
  },
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Skillcruit - Présélection intelligente de CV",
  "description": "Solution SaaS pour automatiser la présélection de candidats. Scoring intelligent, matching automatique, conformité RGPD.",
  "brand": {
    "@type": "Brand",
    "name": "Skillcruit",
  },
  "category": "Logiciel RH",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "0",
    "highPrice": "499",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "bestRating": "5",
    "ratingCount": "10",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Skillcruit",
  "url": "https://skillcruit.fr",
  "logo": "https://skillcruit.fr/favicon.ico",
  "description": "Skillcruit développe une solution de présélection intelligente pour recruteurs, combinant NLP contextuel et conformité RGPD.",
  "sameAs": ["https://linkedin.com/company/skillcruit"],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@skillcruit.app",
    "contactType": "sales",
    "availableLanguage": "French",
  },
  "foundingDate": "2024",
  "areaServed": "FR",
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
});
