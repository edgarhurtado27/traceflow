import { RefObject } from 'react';

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";


interface EditorProps {
  code: string,
  editorViewRef: RefObject<EditorView | null>,
}

const executionTheme = EditorView.theme({
  ".cm-activeLine": {
    backgroundColor: "#fff3cd",
    borderLeft: "5px solid #f59e0b"
  }
});

export default function Editor({editorViewRef, code}: EditorProps) {
    
  return (
        <CodeMirror
          height="500px"
          editable={false}
          extensions={[javascript({ jsx: true }), executionTheme]}
          value={code}
          onCreateEditor={(view : EditorView) => {
            editorViewRef.current = view;
          }}
    />
  );
}
