import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-validate-type";
import "filepond-plugin-image-exif-orientation";
import "filepond-plugin-image-preview";

registerPlugin(
  require("filepond-plugin-file-validate-type"),
  require("filepond-plugin-image-exif-orientation"),
  require("filepond-plugin-image-preview")
);

const FileInput = ({ onChange, onUpload}) => {

const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (files) => {
    if (files.length > 0) {
       setSelectedFile(files[0].file);
      //const reader = new FileReader();
    //   reader.onloadend = () => {
    //     //onUpload(reader.result.split(',')[1])
    //   };
    //   //reader.readAsDataURL(files[0].file);
      if (onChange) {
        onChange(files[0].file);
      }
    }
    else{
        onUpload(null)
    }
  };

  return (
    <FilePond
      allowFileTypeValidation={true}
      allowImageExifOrientation={true}
      allowImagePreview={false}
      onupdatefiles={handleFileChange}
      maxFiles={1}
    />
  );
};

export default FileInput;
