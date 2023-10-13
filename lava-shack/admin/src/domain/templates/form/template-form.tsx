import { Controller } from "react-hook-form"
import InputField from "../../../components/molecules/input"
import FocusModal from "../../../components/molecules/modal/focus-modal"
import FormHeader from "./form-header"
import { useTemplateForm } from "./template-form-content"
import clsx from "clsx"
import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import { TemplateType } from "../../../types/shared"
import TextArea from "../../../components/molecules/textarea"
import DescSection from "../description"

function TemplateForm(props) {
  const { control, register, template, formState } = useTemplateForm()

  const editorRefTiny = useRef<Editor["editor"] | null>(null)
  const inputImageRef = useRef<HTMLInputElement | null>(null)

  const { errors } = formState

  return (
    <FocusModal>
      <FocusModal.Header>
        <FormHeader {...props} />
      </FocusModal.Header>
      <FocusModal.Main>
        <div className="mb-[25%] flex justify-center">
          <div className="w-full pt-16 small:w-4/5 medium:w-7/12 large:w-6/12">
            <h1 className="inter-xlarge-semibold mb-[28px]">
              {template?.type.toUpperCase()} -{" "}
              {template?.title ?? "Edit Template"}
            </h1>
            <div className="accordion-margin-transition flex flex-col gap-y-small group-radix-state-open:mt-5">
              <InputField
                label="Subject"
                required
                tooltipContent="The subject of the email"
                placeholder="Email subject"
                {...register("subject", { required: "Subject is required" })}
                className="md:w-1/2"
                errors={errors}
              />
              {template?.type === TemplateType.EMAIL ? (
                <Controller
                  name="template"
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
                              height: 750,
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
                                      if (!file || !editorRefTiny.current)
                                        return

                                      const reader = new FileReader()
                                      reader.addEventListener("load", () => {
                                        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
                                        const id =
                                          "blobid" + new Date().getTime()
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
              ) : (
                <TextArea
                  label={"Template"}
                  {...register("template", {
                    required: "Template is required",
                  })}
                  rows={10}
                  placeholder="SMS template"
                  errors={errors}
                />
              )}
              <DescSection />
            </div>
          </div>
        </div>
      </FocusModal.Main>
    </FocusModal>
  )
}
export default TemplateForm
