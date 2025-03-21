"use client";

import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Firebase
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../../../src/firebase";

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUpdloadImage = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send formData to your backend
    console.log(formData);
  };

  if (!isLoaded) {
    return null;
  }
  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <>
        <div className="container">
          <h1>Create a post</h1>
          <form onSubmit={handleSubmit}>
            <div className="title-cat">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
              </select>
            </div>

            <div className="upload">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={handleUpdloadImage} disabled={imageUploadProgress}>
                {imageUploadProgress ? <span>Loading...</span> : "Upload Image"}
              </button>
            </div>
            <div className="show-image and-error">
              {imageUploadError && <p style={{ color: "red" }}>{imageUploadError}</p>}
              {formData.image && <img src={formData.image} alt="Uploaded" />}
            </div>
            <ReactQuill value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} />

            <button type="submit">Publish</button>
          </form>
        </div>
      </>
    );
  } else {
    return <h1 style={{ textAlign: "center" }}>You are not authorized to view this page</h1>;
  }
}
