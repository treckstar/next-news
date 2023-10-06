import { notFound } from "next/navigation"
import { Locale } from "@/i18n/i18n"
import { listArticlesByCategory } from "@/lib/client"
import { CategoryArticlesInfiniteDynamic } from "./CategoryArticlesInfiniteDynamic"

export const CATEGORY_ARTICLES_PER_PAGE = 4

type CategoryArticlesProps = {
  category: string
  locale: Locale
}

export async function CategoryArticles({ locale, category }: CategoryArticlesProps) {
  const articles = await listArticlesByCategory({ locale: locale, categorySlug: category })

  if (!articles) return notFound()
  return (
    <section className="w-full">
      <div className="mb-10 w-full border-b-[1px] py-14">
        <h2 className="mb-6 text-3xl font-bold">Search Category</h2>
        <p className="mb-2 text-xs">Showing {articles.count} results for: </p>
        <p className="text-xl font-bold">&quot;{category}&quot;</p>
      </div>
      <div className="mx-auto w-full">
        <CategoryArticlesInfiniteDynamic category={category} initialArticles={articles} />
      </div>
    </section>
  )
}
