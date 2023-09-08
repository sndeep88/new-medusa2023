import { useAdminCustomPost, useAdminCustomQuery } from "medusa-react"

import Container from "../../../../../components/organisms/section"
import Button from "../../../../../components/fundamentals/button"
import { Product } from "@medusajs/medusa"
import EditorJS from "@editorjs/editorjs"

import { EDITOR_JS_TOOLS } from "./tools"
import { useCallback, useEffect, useRef, useState } from "react"
import { set } from "lodash"
import { m } from "framer-motion"

type Props = {
  product: Product
}

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Product Description",
      },
    },
  ],
}

function DescriptionSection({ product }: Props) {
  const { mutate } = useAdminCustomPost<any, any>(
    `/product/description/${product.id}`,
    ["product-description", product.id]
  )

  const { data, isLoading } = useAdminCustomQuery(
    `/product/description/${product.id}`,
    ["product-description", product.id],
    undefined,
    {
      refetchOnMount: true,
      cacheTime: 0,
    }
  )

  const [disabled, setDisabled] = useState(true)

  const editorRef = useRef<EditorJS | null>(null)
  const first = useRef(true)
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor
      },
      tools: EDITOR_JS_TOOLS,
      minHeight: 100,
      placeholder: "Start writing your product description...",
      data: JSON.parse(data?.content ?? "{}"),
      onChange: async () => {
        const content = await editor.saver.save()
        console.log({ change: "change", content })
        if (content.time !== JSON.parse(data?.content ?? "{}").time) {
          setDisabled(false)
        } else {
          setDisabled(true)
        }
      },
    })
  }

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }

    if (!editorRef.current && data) {
      initEditor()
    }

    return () => {
      editorRef.current?.destroy()
      editorRef.current = null
    }
  }, [data])

  const onComplete = async () => {
    if (!editorRef.current) return

    const content = await editorRef.current.saver.save()
    console.log({ content })

    if (!content) return

    mutate(
      { content },
      {
        onSuccess() {
          setDisabled(true)
        },
      }
    )
  }

  return (
    <Container>
      <div className="flex items-center">
        <div>
          <h1 className="text-lg font-semibold">Product Description</h1>
        </div>
        <div className="ml-auto flex items-start gap-2">
          <Button
            variant="primary"
            size="small"
            onClick={() => onComplete()}
            disabled={disabled}
          >
            Save
          </Button>
        </div>
      </div>
      <div id="editorjs" />
    </Container>
  )
}

export default DescriptionSection
