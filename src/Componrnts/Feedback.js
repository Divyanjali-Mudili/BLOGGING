import React, { useState } from 'react';

const FeedbackForm = () => {
  const [emoji, setEmoji] = useState('');
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      emoji,
      message,
      visibility,
      username,
      email,
    });
    // Reset form
    setEmoji('');
    setMessage('');
    setVisibility('private');
    setUsername('');
    setEmail('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Select an Emoji:</label>
          <select className="form-select" value={emoji} onChange={(e) => setEmoji(e.target.value)}>
            <option value="">--Choose an Emoji--</option>
            <option value="😊">😊 Happy</option>
            <option value="😐">😐 Neutral</option>
            <option value="😞">😞 Sad</option>
            <option value="😡">😡 Angry</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Message:</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your feedback..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Visibility:</label>
          <select className="form-select" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Your username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email"
          />
        </div>

        <button type="submit" className="btn btn-primary">Send Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;