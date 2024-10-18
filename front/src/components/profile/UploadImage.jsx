import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    file;
  };
  return (
    <div>
      <input onChange={handleInputFile} type="file" />
    </div>
  );
};

export default UploadImage;
