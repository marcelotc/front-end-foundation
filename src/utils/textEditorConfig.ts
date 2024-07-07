import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageComp from "./imageCompo";

export default Node.create({
  name: "reactComponent",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      src: {
        default: ""
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component"
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComp);
  }
});
