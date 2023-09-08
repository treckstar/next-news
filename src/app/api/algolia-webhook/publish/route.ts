import { NextRequest, NextResponse } from "next/server"
import { pipe } from "utils/pipe"
import { slateToText } from "utils/slateToText"
import { z } from "zod"
import { algoliaClient } from "../algoliaClient"
import { errorToNextResponse } from "../httpError"
import { NextRequestWithValidBody, validateBody } from "../validateBody"
import { validateSignature } from "../validateSignature"

async function handleAlgoliaPublishWebhook(req: NextRequestWithValidBody<z.infer<typeof bodySchema>>) {
  const article = req.validBody.data

  const indexingResults = await Promise.allSettled(
    article.localizations.map(async ({ locale, title, content }) => {
      const index = algoliaClient.initIndex(`articles-${locale}`)
      await index.saveObject({
        objectID: article.id,
        title,
        content: slateToText(content),
      })

      return { title, locale }
    })
  )

  return NextResponse.json({ result: indexingResults }, { status: 201 })
}

export async function POST(req: NextRequest) {
  try {
    return await pipe(req, validateSignature, validateBody(bodySchema), handleAlgoliaPublishWebhook)
  } catch (error) {
    return errorToNextResponse(error)
  }
}

const bodySchema = z.object({
  data: z.object({
    localizations: z.array(z.object({ content: z.any(), title: z.string(), locale: z.string() })),
    id: z.string(),
  }),
})