import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type Nullable<T extends object> = T | null

type ImageDescription =
  | {
      text: string
    }
  | null
  | undefined

type ImageData = { url: string }

type Article = {
  slug: string
  title: string
  image?: Nullable<{
    description?: ImageDescription
    data: ImageData
  }>
}

type Articles = Article[] | undefined | null

type ArtilcesGridProps = { articles: Articles; locale: Locale }

export function ArticlesGrid({ articles, locale }: ArtilcesGridProps) {
  if (!articles || articles.length === 0) return <p>Something went wrong!</p>
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {articles.map((article) => {
        return (
          <Link
            href={`/${locale}/article/${article.slug}`}
            hrefLang={locale}
            prefetch={false}
            passHref
            key={`article-${article.slug}`}
          >
            <article className="flex flex-col gap-2">
              <div className="h-[157px] max-w-[300px] rounded-sm bg-slate-100">
                {article?.image?.data.url && (
                  <Image
                    src={article.image?.data?.url}
                    alt={article.image?.description?.text || ""}
                    width={300}
                    height={157}
                    className="h-[157px] w-[300px] rounded-sm object-cover"
                  />
                )}
              </div>
              <div className="font-semibold">{article.title}</div>
            </article>
          </Link>
        )
      })}
    </div>
  )
}