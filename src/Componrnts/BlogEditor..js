import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import OpenAI from "openai";

const BlogEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const quillInstance = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        },
      });

      setQuill(quillInstance);

      quillInstance.on("text-change", () => {
        onChange(quillInstance.root.innerHTML);
      });
    }
  }, [quill, onChange]);

  // Handle AI Suggestion
  const openai = new OpenAI({
    apiKey: "API KEY",
    // dangerouslyAllowBrowser: true,
  });

  const handleAISuggestion = async () => {
    setLoading(true);
    const text = quill.root.innerText;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Enhance and improve the following blog content.",
          },
          { role: "user", content: text },
        ],
        max_tokens: 200,
      });

      const suggestion = completion.choices[0].message.content;
      quill.root.innerHTML += `<p><strong>AI Suggestion:</strong> ${suggestion}</p>`;
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }}></div>
      <button
        onClick={handleAISuggestion}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
        }}
      >
        {loading ? "Generating..." : "Get AI Suggestion"}
      </button>
    </div>
  );
};

export default BlogEditor;
