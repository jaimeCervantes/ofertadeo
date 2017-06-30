<template>
<div class="quillWrapper">
  <div ref="quillContainer" :id="id"></div>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
const Quill = (process.BROWSER_BUILD) ? require('quill') : ''

var defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block', 'link', 'image'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
]

export default {
  name: 'vue-editor',
  props: {
    value: String,
    id: {
      type: String,
      default: 'quill-container'
    },
    placeholder: String,
    disabled: Boolean,
    editorToolbar: Array
  },

  data () {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
    }
  },

  mounted () {
    this.initializeVue2Editor()
    this.handleUpdatedEditor()
  },

  watch: {
    value (val) {
      if (val !== this.editor.innerHTML && !this.quill.hasFocus()) {
        this.editor.innerHTML = val
      }
    },
    disabled (status) {
      this.quill.enable(!status)
    }
  },

  methods: {
    initializeVue2Editor () {
      this.setQuillElement()
      this.setEditorElement()
      this.checkForInitialContent()
    },

    setQuillElement () {
      this.quill = new Quill(this.$refs.quillContainer, {
        modules: {
          syntax: true,
          toolbar: this.toolbar
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false
      })
    },

    setEditorElement () {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    checkForInitialContent () {
      this.editor.innerHTML = this.value || ''
    },

    handleUpdatedEditor () {
      this.quill.on('text-change', () => {
        this.$emit('input', this.editor.innerHTML)
      })
    }
  }
}
</script>

<style>
  #quill-container {
    height: 400px;
  }
</style>
