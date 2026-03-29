type Locale = 'en' | 'de' | 'ar';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Coreframe',
    url: 'https://coreframe.one',
    logo: 'https://coreframe.one/images/logo.png',
    description:
      'Coreframe is a digital agency specializing in web design, AI-powered visibility, and automation for local businesses.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'German'],
    },
  };
}

export function generateLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://coreframe.one/#business',
    name: 'Coreframe',
    url: 'https://coreframe.one',
    image: 'https://coreframe.one/images/logo.png',
    description:
      locale === 'de'
        ? 'Digitalagentur für Webdesign, KI-Sichtbarkeit und Automatisierung für lokale Unternehmen in Hamburg.'
        : locale === 'ar'
          ? 'وكالة رقمية متخصصة في تصميم المواقع والظهور بالذكاء الاصطناعي والأتمتة للأعمال المحلية في هامبورغ.'
          : 'Digital agency specializing in web design, AI visibility, and automation for local businesses in Hamburg.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamburg',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.5511,
      longitude: 9.9937,
    },
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '42',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Coreframe.one',
    url: 'https://coreframe.one',
    inLanguage: ['en', 'de'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://coreframe.one/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateServiceSchemas(locale: Locale) {
  const servicesByLocale: Record<Locale, { name: string; description: string }[]> = {
    de: [
      { name: 'Webdesign & Entwicklung', description: 'Hochkonvertierende, mobile-first Websites mit modernen Frameworks.' },
      { name: 'Lokales SEO', description: 'Ranken Sie höher in lokalen Suchergebnissen.' },
      { name: 'GEO — KI-Suchsichtbarkeit', description: 'Werden Sie von KI-Systemen wie ChatGPT und Perplexity empfohlen.' },
      { name: 'KI-Automatisierung', description: 'Intelligente Bots, die Anfragen bearbeiten und Termine buchen.' },
      { name: 'Google My Business', description: 'Einrichtung und Optimierung Ihres Google-Unternehmensprofils.' },
    ],
    ar: [
      { name: 'تصميم وتطوير المواقع', description: 'مواقع عالية التحويل، موبايل أولاً، مبنية بأطر عمل حديثة.' },
      { name: 'SEO محلي', description: 'ارتقِ في نتائج البحث المحلية.' },
      { name: 'GEO — ظهور البحث بالذكاء الاصطناعي', description: 'احصل على توصية من أنظمة الذكاء الاصطناعي مثل ChatGPT و Perplexity.' },
      { name: 'أتمتة الذكاء الاصطناعي', description: 'بوتات ذكية تعالج الاستفسارات وتحجز المواعيد.' },
      { name: 'Google My Business', description: 'إعداد وتحسين ملف Google التجاري.' },
    ],
    en: [
      { name: 'Web Design & Development', description: 'High-converting, mobile-first websites built with modern frameworks.' },
      { name: 'Local SEO', description: 'Rank higher in local search results.' },
      { name: 'GEO — AI Search Visibility', description: 'Get recommended by AI systems like ChatGPT and Perplexity.' },
      { name: 'AI Automation', description: 'Intelligent bots that handle inquiries and book appointments.' },
      { name: 'Google My Business', description: 'Setup and optimization of your Google Business Profile.' },
    ],
  };
  const services = servicesByLocale[locale];

  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@id': 'https://coreframe.one/#business' },
    name: service.name,
    description: service.description,
    areaServed: {
      '@type': 'City',
      name: 'Hamburg',
    },
  }));
}

export function generateFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'de' ? 'Startseite' : locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `https://coreframe.one/${locale}`,
      },
    ],
  };
}
