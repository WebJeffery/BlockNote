import {
  BlockNoteEditor,
  BlockNoteEditorOptions,
  BlockSchemaFromSpecs,
  BlockSpecs,
  InlineContentSchemaFromSpecs,
  InlineContentSpecs,
  StyleSchemaFromSpecs,
  StyleSpecs,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  getBlockSchemaFromSpecs,
} from "@blocknote/core";
import { getDefaultReactSlashMenuItems } from "../slashMenuItems/defaultReactSlashMenuItems";

const initEditor = <
  BSpecs extends BlockSpecs,
  ISpecs extends InlineContentSpecs,
  SSpecs extends StyleSpecs
>(
  options: Partial<BlockNoteEditorOptions<BSpecs, ISpecs, SSpecs>>
) =>
  BlockNoteEditor.create({
    slashMenuItems: getDefaultReactSlashMenuItems(
      getBlockSchemaFromSpecs(options.blockSpecs || defaultBlockSpecs)
    ),
    ...options,
  });

/**
 * Main hook for importing a BlockNote editor into a React project
 */
export const useBlockNote = <
  BSpecs extends BlockSpecs = typeof defaultBlockSpecs,
  ISpecs extends InlineContentSpecs = typeof defaultInlineContentSpecs,
  SSpecs extends StyleSpecs = typeof defaultStyleSpecs
>(
  options: Partial<BlockNoteEditorOptions<BSpecs, ISpecs, SSpecs>> = {}
) => {
  return initEditor(options); //eslint-disable-line react-hooks/exhaustive-deps
};
