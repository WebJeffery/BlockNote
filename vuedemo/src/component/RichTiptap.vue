<template>
  <div id="richtap">
    <BasicPure :editor="editor"></BasicPure>
  </div>
</template>

<script setup>
import {
  // applyReactInVue,
  lazyReactInVue,
  applyPureReactInVue,
} from "veaury";

import { Editor } from "novel";
const BasicPure = applyPureReactInVue(Editor);

import { BlockNoteEditor } from "@blocknote/core";
// const editor = BlockNoteEditor.create({
//   element: document.getElementById("richtap"), // element to append the editor to
//   onUpdate: ({ editor }) => {
//     console.log(editor.getJSON());
//   },
// });

// console.log("editor,", editor);

import { BlockNoteView, useBlockNote } from "@blocknote/react";
// import "@blocknote/react/style.css";

// const BasicPure = applyPureReactInVue(BlockNoteView)

// const editor = useBlockNote({
//   onEditorContentChange: (editor) => {
//     // Log the document to console on every update
//     console.log(editor.getJSON());
//   },
// });

// export default {
//   components: {
//     BasicPure: applyPureReactInVue(BlockNoteView)
//   },

//   setup() {
//     const editor = useBlockNote({
//       onEditorContentChange: (editor) => {
//         // Log the document to console on every update
//         console.log(editor.getJSON());
//       },
//     });
//     return {
//       editor
//     }
//   }
// }
</script>
