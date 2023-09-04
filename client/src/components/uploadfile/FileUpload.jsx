import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfilePhoto } from '../../features/user/userSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const { user_id } = user;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('user', user_id);

    try {
      const response = await fetch('/api/v1/s3/upload', {
        responseType: 'arraybuffer',
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        dispatch(getProfilePhoto());
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="profile-photo">
      <label htmlFor="">profile photo</label>
      <img src={user.profile_photo} />
      <div>
        <input type="file" onChange={handleFileChange} />
        <button className="button-3" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
