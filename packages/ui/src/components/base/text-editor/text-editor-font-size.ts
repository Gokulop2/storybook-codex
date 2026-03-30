import { Extension } from "@tiptap/core";

/**
 * Font size on the `textStyle` mark (same pattern as `@tiptap/extension-color` / `font-family`).
 * Apply with `editor.chain().focus().setMark("textStyle", { fontSize: "16px" }).run()`.
 */
export const TextEditorFontSize = Extension.create({
  name: "textEditorFontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});
