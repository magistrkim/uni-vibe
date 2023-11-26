import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

const FileUploader = () => {
  const [fileUrl, setFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col flex-center rounded-xl bg-dark-3 cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div> test 1</div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
            />
            <h3 className='base-medium mt-6 mb-2 text-light-2'>Drag photo here</h3>
            <p className="small-regular mb-6 text-light-4">SVG, PNG, JPG</p>
            <Button className='shad-button_dark_4'>Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
