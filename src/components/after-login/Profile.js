import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "../../styles/after-login.css"; // Updated import path

const Profile = () => {
  const [user, setUser] = useState({
    fatherName: "",
    motherName: "",
    yearOfJoining: "",
    gender: "",
    bloodGroup: "",
    branch: "",
    email: "",
    photo: null,
  });

  const [cropData, setCropData] = useState(null); // To store the cropped image data
  const [isImageCropped, setIsImageCropped] = useState(false); // Flag to indicate if the image has been cropped
  const cropperRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: URL.createObjectURL(file) });
      setIsImageCropped(false); // Reset cropped state if new photo is uploaded
    }
  };

  const handleSave = () => {
    if (cropperRef.current) {
      const croppedImage = cropperRef.current.getCroppedCanvas().toDataURL();
      setCropData(croppedImage); // Save the cropped image as base64
      setIsImageCropped(true); // Mark image as cropped
    }
  };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        {/* Profile Picture Upload Section */}
        <div className="photo-section">
          <label>Upload Photo:</label>

          {/* Profile Picture Editor (only visible if photo is not cropped yet) */}
          <div className="photo-editor-container">
            {!isImageCropped ? (
              <div className="photo-editor">
                {user.photo ? (
                  <Cropper
                    ref={cropperRef}
                    src={user.photo}
                    style={{ height: 200, width: "100%" }}
                    aspectRatio={1}
                    guides={false}
                    viewMode={1}
                  />
                ) : (
                  <div className="profile-icon">
                    <i className="fas fa-user"></i> {/* Default profile icon */}
                  </div>
                )}
              </div>
            ) : (
              // When the image is cropped, display the cropped image
              <div className="cropped-profile-picture">
                <img
                  src={cropData}
                  alt="Cropped Profile"
                  style={{ width: 150, height: 150, borderRadius: "50%" }}
                />
              </div>
            )}
          </div>

          {/* File Input (for uploading photo) */}
          {!isImageCropped && (
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input"
            />
          )}

          {/* Crop & Save Button (only visible if photo is uploaded) */}
          {user.photo && !isImageCropped && (
            <div className="crop-save-container">
              <button type="button" onClick={handleSave} className="crop-button">
                Crop & Save Image
              </button>
            </div>
          )}
        </div>

        {/* Form Sections */}
        <div className="form-sections">
          <div className="form-section">
            <label>Father's Name:</label>
            <input
              type="text"
              name="fatherName"
              value={user.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label>Mother's Name:</label>
            <input
              type="text"
              name="motherName"
              value={user.motherName}
              onChange={handleChange}
            />
          </div>
          <div className="form-section">
            <label>Year of Joining:</label>
            <input
              type="number"
              name="yearOfJoining"
              value={user.yearOfJoining}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-sections">
          <div className="form-section">
            <label>Gender:</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-section">
            <label>Blood Group:</label>
            <select
              name="bloodGroup"
              value={user.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="form-section">
            <label>Branch:</label>
            <input
              type="text"
              name="branch"
              value={user.branch}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-sections">
          <div className="form-section">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-action">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
