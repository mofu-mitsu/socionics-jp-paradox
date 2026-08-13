import type {Metadata} from 'next';
import { Noto_Serif_JP } from 'next/font/google';
import './globals.css';

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ソシオJ/Pねじれ診断',
  description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす診断。',
  openGraph: {
    title: 'ソシオJ/Pねじれ診断',
    description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす診断。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ソシオJ/Pねじれ診断',
    description: 'あなたの「J」はどこから来た？MBTIのJ/Pとソシオニクスの合理/非合理のねじれを解き明かす診断。',
  },
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
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
