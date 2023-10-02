import { Footer } from "@/components/Footer/Footer"
import { Navigation } from "@/components/Navigation/Navigation"
import { env } from "@/env.mjs"
import { type Locale } from "@/i18n/i18n"
import "@/styles/tailwind.css"
import { GoogleAnalytics } from "./GoogleAnalytics"
import Providers from "./Providers"

export async function generateMetadata({ params }: { params: { lang: Locale } }) {
  return {
    title: "Blazity-Hygraph news starter",
    openGraph: {
      url: "https://next-enterprise.vercel.app/",
      images: [
        {
          url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      types: {
        "application/rss+xml": `${env.VERCEL_URL}/api/${params?.lang}`,
      },
    },
  }
}

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang}>
      <GoogleAnalytics />
      <Providers>
        <body className="flex min-h-screen flex-col items-center ">
          <div className="flex w-full justify-center border-b-[1px]">
            <nav className="flex w-full max-w-[1200px] items-center justify-end gap-4 py-4">
              <Navigation locale={params.lang} />
              {/* <DynamicLangSelect /> */}
            </nav>
          </div>

          <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col pb-16">{children}</main>
          <Footer lang={params.lang} />
        </body>
      </Providers>
    </html>
  )
}
