import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  mergeCSSClasses,
  StyleSchema,
} from "@blocknote/core";
import { ref, defineComponent, onMounted } from "vue";
import { Editor, useEditor, EditorContent } from "@tiptap/vue-3";
import { useBlockNote } from "../hooks/useBlockNote";
// import usePrefersColorScheme from "use-prefers-color-scheme";
import {
  Theme,
  applyBlockNoteCSSVariablesFromTheme,
  removeBlockNoteCSSVariables,
} from "./BlockNoteTheme";
// import { FormattingToolbarPositioner } from "../components/FormattingToolbar/FormattingToolbarPositioner";
// import { HyperlinkToolbarPositioner } from "../components/HyperlinkToolbar/HyperlinkToolbarPositioner";
// import { ImageToolbarPositioner } from "../components/ImageToolbar/ImageToolbarPositioner";
// import { SideMenuPositioner } from "../components/SideMenu/SideMenuPositioner";
// import { SlashMenuPositioner } from "../components/SlashMenu/SlashMenuPositioner";
// import { TableHandlesPositioner } from "../components/TableHandles/TableHandlePositioner";
import "./styles.css";

const mantineTheme = {
  // Removes button press effect
  activeClassName: "",
};

export const BlockNoteView = defineComponent({
  props: {
    // editor: {
    //   type: Object,
    //   default: () => ({}),
    // },
  },
  setup(props) {
    debugger;
    let editor = useEditor();
    const { children, className } = props;

    // onMounted(() => {
    //   debugger;
    //   editor.value = new Editor({
    //     content: "<p>hell</p>",
    //   });
    //   // editor.value = useBlockNote();
    // });

    return () => {
      return (
        <EditorContent
          editor={editor?._tiptapEditor}
          className={mergeCSSClasses("bn-container", className || "")}>
          {children || (
            <>
              {/* <FormattingToolbarPositioner editor={editor} />
                <HyperlinkToolbarPositioner editor={editor} />
                <SlashMenuPositioner editor={editor} />
                <SideMenuPositioner editor={editor} />
                <ImageToolbarPositioner editor={editor} />
                {editor.blockSchema.table && (
                  <TableHandlesPositioner editor={editor as any} />
                )} */}
            </>
          )}
        </EditorContent>
      );
    };
  },
});
