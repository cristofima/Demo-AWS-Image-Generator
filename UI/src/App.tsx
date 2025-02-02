import { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/generate-image",
        { prompt }
      );
      setImage(`data:image/png;base64, ${response.data.image}`);
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Amazon Bedrock Image Generator</h1>
      <div className="input-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          className="input-field"
        />
        <button
          onClick={generateImage}
          className="generate-button"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {image && <img src={image} alt="Generated" className="generated-image" />}
      <ToastContainer />
    </div>
  );
}

export default App;
