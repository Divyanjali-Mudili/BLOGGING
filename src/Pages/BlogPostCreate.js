import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BlogEditor from '../Componrnts/BlogEditor.';

const BlogPostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both title and content for your blog post.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3000/user/write', {
        title,
        content,
        author: 'John Doe',
      });

      if (response.data) {
        toast({
          title: "Success",
          description: "Your blog post has been published successfully!",
        });
        setTitle('');
        setContent('');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to publish your blog post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-slate-100 mb-4">
              <Pencil className="h-6 w-6 text-slate-600" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">Create a Blog Post</h1>
            <p className="text-slate-600">Share your thoughts with the world</p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-700">
                Title
              </label>
              <TextField
                id="title"
                type="text"
                placeholder="Enter your blog post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Content
              </label>
              <BlogEditor value={content} onChange={setContent} />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BlogPostCreate;
