import React, { useState } from "react";
import BlogEditor from "../Componrnts/BlogEditor.";

const BlogPostCreate = () => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("Final Content:", content);
    // Send backend data
  };

  return (
    <div>
      <h2>Create a Blog Post</h2>
      <BlogEditor value={content} onChange={setContent} />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "8px",
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Publish
      </button>
    </div>
  );
};

export default BlogPostCreate;
