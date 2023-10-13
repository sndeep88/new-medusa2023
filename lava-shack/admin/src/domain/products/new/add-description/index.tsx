import Container from "../../../../components/organisms/section"
import { ChangeEvent, Ref, RefObject, useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { NestedForm } from "../../../../utils/nested-form"
import { Controller } from "react-hook-form"

function NewDescription({
  form,
  setEditorRef,
  editorRef,
}: {
  form: NestedForm<{ content: string }>
  setEditorRef: (ref: Editor["editor"]) => void
  editorRef: RefObject<Editor["editor"]>
}) {
  // const editorRefTiny = useRef<Editor["editor"] | null>(null)
  const inputImageRef = useRef<HTMLInputElement | null>(null)

  const { control } = form

  return (
    <>
      <Controller
        control={control}
        name="__nested__.content"
        render={({ field: { value, onChange } }) => {
          return (
            <Editor
              onInit={(evt, editor) => setEditorRef(editor)}
              value={
                value ?? "<p>This is the initial content of the editor</p>"
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
                        const file = ev.target?.files
                          ? ev.target.files[0]
                          : null
                        if (!file || !editorRef.current) return

                        const reader = new FileReader()
                        reader.addEventListener("load", () => {
                          /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
                          const id = "blobid" + new Date().getTime()
                          const blobCache =
                            editorRef.current!.editorUpload.blobCache
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
                onChange(content)
              }}
            />
          )
        }}
      />
      <input type="file" accept="image/*" ref={inputImageRef} hidden />
    </>
  )
}
export default NewDescription
