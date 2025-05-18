import { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class CustomClipboard extends Clipboard {
    onPaste(e) {
        const clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('Text').trim();

        if (pastedData && /\.(jpeg|jpg|gif|png|webp)$/i.test(pastedData)) {
            e.preventDefault();
            l;

            const quill = this.quill;
            const range = quill.getSelection(true);

            quill.clipboard.dangerouslyPasteHTML(
                range.index,
                `<img src="${pastedData}" alt="Inserted image" />`
            );
            quill.setSelection(range.index + 1);
        } else {
            super.onPaste(e);
        }
    }
}

Quill.register('modules/clipboard', CustomClipboard, true);

function Editor({
    contentMarkDown,
    setContentMarkDown,
    contentHTML,
    setContentHTML
}) {
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image'
    ];

    const stripHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    return (
        <>
            <div>
                <ReactQuill
                    ref={quillRef}
                    style={{ height: '300px' }}
                    theme='snow'
                    value={contentHTML}
                    onChange={(html) => {
                        setContentHTML(html);
                        const plainText = stripHTML(html);
                        setContentMarkDown(plainText);
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder='Viết nội dung của bạn...'
                />
            </div>
        </>
    );
}

export default Editor;
