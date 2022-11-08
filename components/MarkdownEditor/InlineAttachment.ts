import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { initSearchAndReplace, searchAndReplace } from './searchAndReplace'

interface AttachmentSettings {
  uploadUrl: string
  uploadMethod: string
  uploadFieldName: string
  defaultExtension: string
  jsonFieldUrl: string
  allowedTypes: string[]
  progressText: string
  urlText: string | ((filename: string, ret: any) => string)
  errorText: string
  extraParams: Record<string, any>
  extraHeaders: Record<string, any>
  beforeFileUpload(file: File, xhr: XMLHttpRequest): boolean
  onFileReceived(file: File): boolean
  onFileUploadResponse(file: File, xhr: XMLHttpRequest): boolean
  onFileUploadError(file: File, xhr: XMLHttpRequest): boolean
  onFileUploaded(filename: string): void
}
export type AttachmentOptions = Partial<AttachmentSettings>
const defaults: AttachmentSettings = {
  uploadUrl: '/api/files/upload',
  uploadMethod: 'POST',
  uploadFieldName: 'file',
  defaultExtension: 'png',
  jsonFieldUrl: 'url',
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  progressText: '![Uploading {filename}...]()',
  urlText: '![{filename}]({fileurl})',
  errorText: '文件上传失败',
  extraParams: {},
  extraHeaders: {},
  beforeFileUpload: () => true,
  onFileReceived: () => true,
  onFileUploadResponse: () => true,
  onFileUploadError: () => true,
  onFileUploaded: function () {},
}

class FileUpload {
  editor: EditorState
  file?: File
  filename?: string
  lastValue?: string
  fileurlTag = '{fileurl}'
  filenameTag = '{filename}'
  constructor(private settings: AttachmentSettings, private view: EditorView) {
    this.editor = view.state
  }

  onSelect = (file?: File) => {
    let result = false
    if (file) {
      if (this.isFileAllowed(file)) {
        result = true
        this.onFileInserted(file)
        setTimeout(() => {
          this.uploadFile(file)
        }, 300)
      }
    }

    return result
  }

  onDrop = (e: DragEvent) => {
    let result = false
    if (e.dataTransfer?.files) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i]
        if (this.isFileAllowed(file)) {
          result = true
          this.onFileInserted(file)
          setTimeout(() => {
            this.uploadFile(file)
          }, 300)
        }
      }
    }

    return result
  }

  onPaste = (e: ClipboardEvent) => {
    let result = false
    const clipboardData = e.clipboardData

    if (clipboardData && typeof clipboardData === 'object') {
      const items = clipboardData.items || clipboardData.files || []

      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (this.isFileAllowed(item)) {
          result = true
          this.onFileInserted(item.getAsFile()!)
          setTimeout(() => {
            this.uploadFile(item.getAsFile()!)
          }, 300)
        }
      }
    }

    if (result) {
      e.preventDefault()
    }

    return result
  }

  isFileAllowed = (file: (File | DataTransferItem) & { kind?: string }) => {
    if (file.kind === 'string') {
      return false
    }
    if (this.settings.allowedTypes.indexOf('*') === 0) {
      return true
    } else {
      return this.settings.allowedTypes.indexOf(file.type) >= 0
    }
  }

  onFileInserted = (file: File) => {
    if (this.settings.onFileReceived.call(this, file) !== false) {
      this.filename = file.name
      this.lastValue = this.settings.progressText.replace(this.filenameTag, this.filename)

      this.view.dispatch({
        changes: { from: this.view.state.selection.main.head, insert: this.lastValue },
      })
    }
  }

  uploadFile = (file: File) => {
    var me = this,
      formData = new FormData(),
      xhr = new XMLHttpRequest(),
      settings = this.settings,
      extension = settings.defaultExtension

    this.file = file

    // if (typeof settings.setupFormData === 'function') {
    //   settings.setupFormData(formData, file)
    // }

    // Attach the file. If coming from clipboard, add a default filename (only works in Chrome for now)
    // http://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name
    if (file.name) {
      var fileNameMatches = file.name.match(/\.(.+)$/)
      if (fileNameMatches) {
        extension = fileNameMatches[1]
      }
    }

    var remoteFilename = 'image-' + Date.now() + '.' + extension
    // if (typeof settings.remoteFilename === 'function') {
    //   remoteFilename = settings.remoteFilename(file)
    // }

    formData.append(settings.uploadFieldName, file, remoteFilename)

    // Append the extra parameters to the formdata
    if (typeof settings.extraParams === 'object') {
      for (var key in settings.extraParams) {
        if (settings.extraParams.hasOwnProperty(key)) {
          formData.append(key, settings.extraParams[key])
        }
      }
    }

    xhr.open('POST', settings.uploadUrl)

    // Add any available extra headers
    if (typeof settings.extraHeaders === 'object') {
      for (var header in settings.extraHeaders) {
        if (settings.extraHeaders.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, settings.extraHeaders[header])
        }
      }
    }

    xhr.onload = function () {
      // If HTTP status is OK or Created
      if (xhr.status === 200 || xhr.status === 201) {
        me.onFileUploadResponse(xhr)
      } else {
        me.onFileUploadError(xhr)
      }
    }
    if (settings.beforeFileUpload(file, xhr) !== false) {
      xhr.send(formData)
    }
    return xhr
  }

  onFileUploadResponse = (xhr: XMLHttpRequest) => {
    if (this.settings.onFileUploadResponse.call(this, this.file!, xhr) !== false) {
      var result = JSON.parse(xhr.responseText),
        fileUrl = result[this.settings.jsonFieldUrl]

      if (result && fileUrl) {
        let newValue: string
        if (typeof this.settings.urlText === 'function') {
          newValue = this.settings.urlText.call(this, fileUrl, result)
        } else {
          newValue = this.settings.urlText.replace(this.fileurlTag, fileUrl)
        }
        this.searchAndReplace(newValue)
        this.settings.onFileUploaded.call(this, fileUrl)
      }
    }
  }

  onFileUploadError = (xhr: XMLHttpRequest) => {
    if (this.settings.onFileUploadError.call(this, this.file!, xhr) !== false) {
      this.searchAndReplace(this.settings.errorText)
    }
  }

  searchAndReplace = (newValue: string) => {
    if (this.lastValue) {
      searchAndReplace(this.view, this.lastValue, newValue)
    }
  }
}

function InlineAttachment(options: Partial<AttachmentSettings>) {
  const settings = { ...defaults, ...options }
  return EditorView.domEventHandlers({
    drop: (e, view) => {
      initSearchAndReplace(view)
      const fileUpload = new FileUpload(settings, view)
      if (fileUpload.onDrop(e)) {
        e.stopPropagation()
        e.preventDefault()
        return true
      } else {
        return false
      }
    },
    paste: (e, view) => {
      initSearchAndReplace(view)
      const fileUpload = new FileUpload(settings, view)
      fileUpload.onPaste(e)
    },
  })
}

export function selectFileUpload(view: EditorView, options: AttachmentOptions) {
  const settings = { ...defaults, ...options }
  initSearchAndReplace(view)
  const fileUpload = new FileUpload(settings, view)
  return fileUpload.onSelect
}

export default InlineAttachment
