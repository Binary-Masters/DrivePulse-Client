import React, { Component, ChangeEvent } from 'react';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface EditorConvertToHTMLState {
    editorState: EditorState;
}
interface EditorConvertToHTMLProps {
    initialContent?: string;
}


class TextEditor extends Component<EditorConvertToHTMLProps, EditorConvertToHTMLState> {
    constructor(props: EditorConvertToHTMLProps) {
        super(props);

         // Initialize editor state with default or provided content
         const initialContent = props.initialContent || '<p>Your text goes here</p>';
         const contentBlock = convertFromHTML(initialContent);
         const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
 
         this.state = {
             editorState: EditorState.createWithContent(contentState),
         };
    }

    onEditorStateChange = (editorState: EditorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;

        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarClassName="toolbar-class"
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                        },
                        fontSize: {
                            options: [10, 12, 16, 18, 24],
                        },
                    }}
                />
                
            </div>
        );
    }
}

export default TextEditor;
