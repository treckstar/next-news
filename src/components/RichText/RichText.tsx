import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer"
import { EmbedReferences, RichTextContent } from "@graphcms/rich-text-types"
import Image from "next/image"
import { CodeSnippet } from "../CodeSnippet/CodeSnippet"
import { Quiz } from "../Quiz/Quiz"

export function RichText({
  raw,
  references,
  pClassName,
}: {
  raw: RichTextContent
  references?: EmbedReferences
  pClassName?: string
}) {
  return (
    <HygraphRichText
      references={references}
      content={raw}
      renderers={{
        h1: (props) => <h1 {...props} className="mb-4 text-3xl font-semibold text-gray-900 dark:text-white" />,
        h2: (props) => <h1 {...props} className="mb-4 text-2xl font-semibold text-gray-900  dark:text-white" />,
        h3: (props) => <h3 {...props} className="text-xl font-semibold  dark:text-white" />,
        h4: (props) => <h4 {...props} className="text-lg font-semibold  dark:text-white" />,
        h5: (props) => <h5 {...props} className="text-md font-semibold dark:text-white" />,
        h6: (props) => <h6 {...props} className="text-sm font-semibold dark:text-white" />,
        p: (props) => <p {...props} className={`my-4 text-lg text-gray-800 dark:text-white ${pClassName}`} />,
        ul: (props) => <ul {...props} className="my-4 list-inside list-disc text-lg text-gray-800 dark:text-white" />,
        ol: (props) => (
          <ol {...props} className="my-4 list-inside list-decimal text-lg text-gray-800 dark:text-white" />
        ),
        li: (props) => <li {...props} className="my-2 text-lg text-gray-800 dark:text-white" />,
        code: (props) => <CodeSnippet text={props.children} />,
        code_block: (props) => <CodeSnippet text={props.children} />,
        img: ({ src, altText, height, width }) => (
          <Image
            src={src ?? ""}
            alt={altText ?? ""}
            height={height}
            width={width}
            objectFit="cover"
            className="rounded-xl"
          />
        ),
        embed: {
          Quiz: (props) => {
            return <Quiz initialQuiz={props} />
          },
        },
      }}
    />
  )
}
