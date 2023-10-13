import { useAdminCustomPost, useAdminCustomQuery } from "medusa-react"

import Container from "../../../../../components/organisms/section"
import Button from "../../../../../components/fundamentals/button"
import { Product } from "@medusajs/medusa"
import EditorJS from "@editorjs/editorjs"

import { EDITOR_JS_TOOLS } from "./tools"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import Spinner from "../../../../../components/atoms/spinner"

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
    `/product/description/${product?.id}`,
    ["product-description", product?.id],
    undefined,
    {
      refetchOnMount: true,
      cacheTime: 0,
      enabled: !!product,
    }
  )

  const [disabled, setDisabled] = useState(true)

  const onComplete = async () => {
    // if (!editorRef.current) return
    if (!editorRefTiny.current) return

    const content = editorRefTiny.current.getContent()
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

  const editorRefTiny = useRef<Editor["editor"] | null>(null)

  const inputImageRef = useRef<HTMLInputElement | null>(null)

  return (
    <Container>
      <div className="mb-3 flex items-center">
        <div>
          <h1 className="text-lg font-semibold">Product Description</h1>
        </div>
        <div className="ml-auto flex items-start gap-2">
          <Button
            variant="primary"
            size="small"
            onClick={onComplete}
            disabled={disabled}
          >
            {isLoading ? <Spinner /> : "Save"}
          </Button>
        </div>
      </div>
      <Editor
        onInit={(evt, editor) => (editorRefTiny.current = editor)}
        initialValue={
          data?.content ?? "<p>This is the initial content of the editor</p>"
        }
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "code",
            "wordcount",
          ],
          toolbar:
            "undo redo | styleselect | bold italic forecolor | link | image",
          color_cols: 5,
          a11y_advanced_options: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback(callback, value, meta) {
            if (inputImageRef.current) {
              inputImageRef.current.addEventListener(
                "change",
                // @ts-ignore
                (ev: ChangeEvent<HTMLInputElement>) => {
                  const file = ev.target?.files ? ev.target.files[0] : null
                  if (!file || !editorRefTiny.current) return

                  const reader = new FileReader()
                  reader.addEventListener("load", () => {
                    /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
                    const id = "blobid" + new Date().getTime()
                    const blobCache =
                      editorRefTiny.current!.editorUpload.blobCache
                    const base64 = (reader.result as string).split(",")[1]
                    const blobInfo = blobCache.create(id, file, base64)
                    blobCache.add(blobInfo)

                    /* call the callback and populate the Title field with the file name */
                    callback(blobInfo.blobUri(), { title: file.name })
                  })
                  reader.readAsDataURL(file)
                }
              )

              inputImageRef.current.click()
            }
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
        onEditorChange={(content: string) => {
          if (content !== data?.content) {
            setDisabled(false)
          } else {
            setDisabled(true)
          }
        }}
      />
      <input type="file" accept="image/*" ref={inputImageRef} hidden />
    </Container>
  )
}

export default DescriptionSection
