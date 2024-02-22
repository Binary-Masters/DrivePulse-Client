import React, { Component, ChangeEvent } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface EditorConvertToHTMLState {
    editorState: EditorState;
}

class TextEditor extends Component<{}, EditorConvertToHTMLState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
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
