import { NodeViewWrapper } from "@tiptap/react";
import React from "react";

export default (props: any) => {

    return (
    <NodeViewWrapper>
      <div className="content">
        <img
          src={props.node.attrs.src}
          width="100px"
          height="100px"
          alt="testimg"
        />
      </div>
    </NodeViewWrapper>
  );
};
