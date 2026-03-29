import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Be_Vietnam_Pro, Newsreader } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/animations/SmoothScroll';
import CustomCursor from '@/components/animations/CustomCursor';
import ScrollProgress from '@/components/animations/ScrollProgress';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateServiceSchemas,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-headline',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-label',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://coreframe.one'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        de: '/de',
        ar: '/ar',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'Coreframe.one',
      locale: locale === 'de' ? 'de_DE' : locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'de' | 'ar')) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const typedLocale = locale as 'en' | 'de' | 'ar';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const faqItems = messages.faq.items.map((item: { question: string; answer: string }) => ({
    question: item.question,
    answer: item.answer,
  }));

  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(typedLocale),
    generateWebSiteSchema(),
    ...generateServiceSchemas(typedLocale),
    generateFAQSchema(faqItems),
    generateBreadcrumbSchema(typedLocale),
  ];

  return (
    <html lang={locale} dir={dir} className={`${beVietnamPro.variable} ${newsreader.variable}`}>
      <head>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-[family-name:var(--font-headline)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
