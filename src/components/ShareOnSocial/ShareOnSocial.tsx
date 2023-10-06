import { Facebook, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { Locale } from "@/i18n/i18n"

type ShareOnSocialProps = {
  lang: Locale
  articleTitle: string
  articleUrl: string
}

export function ShareOnSocial({ articleTitle, articleUrl, lang }: ShareOnSocialProps) {
  const encodedTitle = encodeURIComponent(articleTitle)
  const encodedUrl = encodeURIComponent(articleUrl)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${articleUrl}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`

  return (
    <div className="flex items-center gap-2 py-5">
      <p className="pr-3 text-sm text-custom-gray-300">Share on social:</p>
      <Link href={twitterShareUrl} hrefLang={lang} className="rounded-xl bg-black p-2">
        <Twitter fill="white" stroke="none" />
      </Link>
      <Link href={facebookShareUrl} hrefLang={lang} className="rounded-xl bg-black p-2">
        <Facebook fill="white" stroke="none" />
      </Link>
      <Link href={linkedinShareUrl} hrefLang={lang} className="rounded-xl bg-black p-2">
        <Linkedin fill="white" stroke="none" />
      </Link>
    </div>
  )
}