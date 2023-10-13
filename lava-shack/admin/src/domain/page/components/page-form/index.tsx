import { Controller } from "react-hook-form"
import InputField from "../../../../components/molecules/input"
import FocusModal from "../../../../components/molecules/modal/focus-modal"
import FormHeader from "./form-header"
import { usePageForm } from "./form/page-form-context"
import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import clsx from "clsx"

const PageForm = (props: { viewType: "create" | "update" }) => {
  const { control, register } = usePageForm()

  const editorRefTiny = useRef<Editor["editor"] | null>(null)
  const inputImageRef = useRef<HTMLInputElement | null>(null)

  return (
    <FocusModal>
      <FocusModal.Header>
        <FormHeader {...props} />
      </FocusModal.Header>
      <FocusModal.Main>
        <div className="mb-[25%] flex justify-center">
          <div className="w-full pt-16 small:w-4/5 medium:w-7/12 large:w-6/12">
            <h1 className="inter-xlarge-semibold mb-[28px]">
              {props.viewType === "create" ? "Create new page" : "Edit page"}
            </h1>
            <div className="accordion-margin-transition flex flex-col gap-y-small group-radix-state-open:mt-5">
              <InputField
                label="Title"
                required
                placeholder="Page title"
                {...register("title", { required: "Title is required" })}
              />
              {props.viewType === "update" && (
                <InputField
                  label="Slug"
                  placeholder="Page slug"
                  {...register("slug")}
                  prefix="/pages/"
                />
              )}
              <Controller
                name="content"
                control={control}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <div className="w-full">
                      <div
                        className={clsx(
                          "inter-small-semibold mb-xsmall flex w-full items-center text-grey-50"
                        )}
                      >
                        <label>Content</label>
                      </div>

                      <div className="w-full">
                        <Editor
                          onInit={(evt, editor) =>
                            (editorRefTiny.current = editor)
                          }
                          value={value ?? "<p></p>"}
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
                                        editorRefTiny.current!.editorUpload
                                          .blobCache
                                      const base64 = (
                                        reader.result as string
                                      ).split(",")[1]
                                      const blobInfo = blobCache.create(
                                        id,
                                        file,
                                        base64
                                      )
                                      blobCache.add(blobInfo)

                                      /* call the callback and populate the Title field with the file name */
                                      callback(blobInfo.blobUri(), {
                                        title: file.name,
                                      })
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
                            // if (content !== value) {
                            //   setDisabled(false)
                            // } else {
                            //   setDisabled(true)
                            // }
                            onChange(content)
                          }}
                        />
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          ref={inputImageRef}
                        />
                      </div>
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </div>
      </FocusModal.Main>
    </FocusModal>
  )
}

export default PageForm
