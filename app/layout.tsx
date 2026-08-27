import type {Metadata} from 'next';
import { Noto_Serif_JP } from 'next/font/google';
import './globals.css';

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://socionics-jp-paradox.vercel.app'),
  title: 'ソシオJ/Pねじれ診断 | MBTIとソシオニクスの構造的ねじれを完全解明',
  description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす深層心理テスト。16タイプから直接選ぶ近似診断も！',
  openGraph: {
    title: 'ソシオJ/Pねじれ診断',
    description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす診断。',
    type: 'website',
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: 'ソシオJ/Pねじれ診断' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ソシオJ/Pねじれ診断',
    description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす診断。',
    images: ['/ogp.png']
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja" className={notoSerif.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GNTX973GET"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GNTX973GET');
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
