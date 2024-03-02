import React, { Component, ChangeEvent } from 'react';
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface EditorConvertToHTMLState {
  editorState: EditorState;
}

interface EditorConvertToHTMLProps {
  initialContent?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
class TextEditor extends Component<
  EditorConvertToHTMLProps,
  EditorConvertToHTMLState
> {
  constructor(props: EditorConvertToHTMLProps) {
    super(props);

    // Initialize editor state with default or provided content
    const initialContent = props.initialContent || '<p>Your text goes here</p>';
    const contentBlock = convertFromHTML(initialContent);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );

    this.state = {
      editorState: EditorState.createWithContent(contentState),
    };
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };


  getContentAsPlainText = () => {
    const { editorState } = this.state;
    const currentText= editorState.getCurrentContent().getPlainText('\u0001');
    return currentText;
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"   
          onEditorStateChange={(editorState) => {
            this.props.setContent(
                editorState.getCurrentContent().getPlainText('\u0001')
            );
            this.onEditorStateChange(editorState);
          }}
          toolbarClassName="toolbar-class"
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'remove',
              'history',
            ],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
            },
            fontSize: {
              options: [10, 12, 16, 18, 24],
            },
          }}
        />
        {/* <button className='btn' onClick={() => console.log(this.getContentAsPlainText())}>
          Get Plain Text Content
        </button> */}
      </div>
    );
  }
}

export default TextEditor;
