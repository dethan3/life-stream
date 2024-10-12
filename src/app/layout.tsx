import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Life Stream',
  description: 'An app to record life events',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#000000',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}