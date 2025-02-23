import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { Wand2 } from 'lucide-react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const BlogEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editorRef.current || quillInstanceRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          ['clean'],
        ],
      },
      placeholder: 'Start writing your blog post...',
    });

    quillInstanceRef.current = quill;

    quill.on('text-change', () => {
      onChange(quill.root.innerHTML);
    });

    // Apply custom styles to Quill editor
    const editorStyles = document.createElement('style');
    editorStyles.textContent = `
      .ql-toolbar.ql-snow {
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem 0.5rem 0 0;
        background-color: #f8fafc;
      }
      .ql-container.ql-snow {
        border: 1px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        min-height: 300px;
        font-family: 'Inter', sans-serif;
      }
      .ql-editor {
        font-size: 1rem;
        line-height: 1.75;
      }
    `;
    document.head.appendChild(editorStyles);
  }, [onChange]);

  const handleAISuggestion = async () => {
    if (!quillInstanceRef.current) return;

    setLoading(true);
    try {
      // Simulate AI suggestion for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      const suggestion = "Here's a suggested improvement for your content...";
      quillInstanceRef.current.root.innerHTML += `<p><strong>AI Suggestion:</strong> ${suggestion}</p>`;
      toast({
        title: "AI Suggestion Generated",
        description: "The suggestion has been added to your editor.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI suggestion. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={editorRef} className="transition-all duration-200 ease-in-out"></div>
      <Button
        onClick={handleAISuggestion}
        disabled={loading}
        variant="outline"
        className="w-full transition-all duration-200 hover:bg-slate-100"
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {loading ? 'Generating suggestion...' : 'Get AI Suggestion'}
      </Button>
    </div>
  );
};

export default BlogEditor;