import React, { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = null; // Clear the file input
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-400 rounded-full relative">
          <LuUser className="text-4xl text-white" />
          <button
            type="button"
            className="w-6 h-6 bg-violet-900 text-white rounded-full flex items-center justify-center absolute -bottom-1 -right-1 shadow-md"
            onClick={onChooseFile}
          >
            <LuUpload className="w-4 h-4 " />
          </button>
        </div>
      ) : (
        <div className="relative w-20 h-20">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
