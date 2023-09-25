import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type RecommendedArticle = {
  title: string
  slug: string
  id: string
  coverImage?: { url: string } | null | undefined
}

type RecommendedArticlesProps = { recommendedArticles: RecommendedArticle[]; lang: Locale }

export async function RecommendedArticles({ recommendedArticles, lang }: RecommendedArticlesProps) {
  return (
    <section className="w-full px-4">
      <h2 className="mb-4 text-2xl font-bold">Recommended articles</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {recommendedArticles?.map((article) => (
          <Link href={`/${lang}/article/${article.slug}`} prefetch={false} passHref key={`recommended-${article.id}`}>
            <article className="flex flex-col gap-2">
              <div className="h-[157px] max-w-[300px] rounded-sm bg-slate-100">
                {article?.coverImage?.url && (
                  <Image
                    src={article.coverImage.url}
                    alt={article.title}
                    width={300}
                    height={157}
                    className="h-[157px] w-[300px] rounded-sm object-cover"
                  />
                )}
              </div>
              <div className="font-semibold">{article?.title}</div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}