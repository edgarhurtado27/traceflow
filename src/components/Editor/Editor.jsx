import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";

export default function Editor({editorViewRef, code}) {

  const executionTheme = EditorView.theme({
    ".cm-activeLine": {
      backgroundColor: "#fff3cd",
      borderLeft: "5px solid #f59e0b"
    }
  });
    
  return (
        <CodeMirror
          height="500px"
          editable={false}
          extensions={[javascript({ jsx: true }), executionTheme]}
          value={code}
          onCreateEditor={(view) => {
            editorViewRef.current = view;
          }}
    />
      );

}
