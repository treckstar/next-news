import Image from "next/image"
import { cn } from "@/utils/cn"
import { formatDate } from "@/utils/formatDate"

type ArticlePublishDetailsProps = {
  author: string
  publicationDate: string | null | Date
  imageUrl?: string
  variant?: "dark" | "light"
}

export function ArticlePublishDetails({
  author,
  publicationDate,
  imageUrl,
  variant = "dark",
}: ArticlePublishDetailsProps) {
  return (
    <div
      className={cn(
        variant === "dark" && " text-custom-dim",
        variant === "light" && " text-gray-500",
        "flex items-center gap-2 text-center text-sm "
      )}
      style={{ textShadow: variant === "dark" ? "0px 1px 2px rgba(26, 26, 27, 1)" : undefined }}
    >
      {publicationDate && (
        <>
          <p>{formatDate(publicationDate)}</p>
          <p>|</p>
        </>
      )}
      <p>{author}</p>
      {imageUrl && <Image src={imageUrl} alt="author" width={24} height={24} className="rounded-full" />}
    </div>
  )
}
