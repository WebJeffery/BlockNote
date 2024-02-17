<template>
  <div id="richtap">
    hello world
    <EditorContent :editor="editor"></EditorContent>
    <!-- <VueEditorView :options="options"></VueEditorView> -->
    <!-- <BlockNoteView></BlockNoteView> -->
  </div>
</template>

<script setup>
import { BlockNoteView, useBlockNote } from "blocknote-editor-vue";

import { useEditor, EditorContent } from "../../tiptap-vue";
import StarterKit from "@tiptap/starter-kit";

// import { VueEditorView, EditorMainView } from "tiptap-editor";
// import "tiptap-editor/style.css";
// const editor = useBlockNote();
debugger;
const editor = useEditor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit],
});

const options = {
  onEditorContentChange: (editor) => {
    // Log the document to console on every update
    // console.log(editor.getJSON());
  },
};
</script>
