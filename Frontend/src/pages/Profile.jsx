import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleUser, Upload, Eye, EyeOff, Trash2, AlertCircle, X } from 'lucide-react';

const Profile = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  
  // States for Password Visibility
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [user, setUser] = useState({
    username: "User Name",
    email: "user@example.com",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePic: localStorage.getItem("profilePic") || ""
  });
  
  const [loading, setLoading] = useState(false);
  const passwordsMatch = user.newPassword === user.confirmPassword;

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "your_preset_name"); 
    setLoading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      setUser({ ...user, profilePic: file.secure_url });
      localStorage.setItem("profilePic", file.secure_url);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
        alert("New passwords do not match!");
        return;
    }
    console.log("Saving user data:", user);
    alert("Profile Updated Successfully!");
  };

  // Delete Account Function
  const confirmDelete = () => {
    console.log("Deleting account for user:", userid);
    // Yahan delete ki API call aayegi
    setShowDeleteModal(false);
    navigate('/login'); // Delete ke baad login par bhej do
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ color: '#1e3a8a', textAlign: 'center', marginBottom: '30px' }}>User Profile</h2>

        {/* IMAGE SECTION */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3b82f6' }} />
            ) : (
              <CircleUser size={120} color="#cbd5e1" strokeWidth={1} />
            )}
            <label htmlFor="file-upload" style={uploadIconStyle}>
              <Upload size={16} />
              <input id="file-upload" type="file" onChange={uploadImage} style={{ display: 'none' }} />
            </label>
          </div>
          {loading && <p style={{ color: '#3b82f6', fontSize: '12px', marginTop: '10px' }}>Uploading...</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Username</label>
            <div style={infoBoxStyle}>{user.username}</div>

            <label style={labelStyle}>Email Address</label>
            <div style={infoBoxStyle}>{user.email}</div>

            <label style={labelStyle}>Old Password</label>
            <div style={inputWrapper}>
              <input type={showOld ? "text" : "password"} placeholder="Current password" style={inputStyle} onChange={(e) => setUser({...user, oldPassword: e.target.value})} />
              <div onClick={() => setShowOld(!showOld)} style={eyeIconStyle}>{showOld ? <EyeOff size={18} /> : <Eye size={18} />}</div>
            </div>

            <label style={labelStyle}>New Password</label>
            <div style={inputWrapper}>
              <input type={showNew ? "text" : "password"} placeholder="New password" style={inputStyle} onChange={(e) => setUser({...user, newPassword: e.target.value})} />
              <div onClick={() => setShowNew(!showNew)} style={eyeIconStyle}>{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</div>
            </div>

            <label style={labelStyle}>Confirm New Password</label>
            <div style={inputWrapper}>
              <input type={showConfirm ? "text" : "password"} placeholder="Confirm new password" style={{...inputStyle, border: !passwordsMatch && user.confirmPassword ? '1px solid #ef4444' : '1px solid #e5e7eb'}} onChange={(e) => setUser({...user, confirmPassword: e.target.value})} />
              <div onClick={() => setShowConfirm(!showConfirm)} style={eyeIconStyle}>{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</div>
            </div>

            {!passwordsMatch && user.confirmPassword && (
              <div style={{ color: '#ef4444', fontSize: '12px', display: 'flex', alignItems: 'center', marginTop: '-10px', marginBottom: '15px' }}>
                <AlertCircle size={14} style={{ marginRight: '5px' }} /> New passwords do not match
              </div>
            )}
          </div>

          <button type="submit" disabled={!passwordsMatch && user.confirmPassword} style={{...saveBtnStyle, opacity: !passwordsMatch && user.confirmPassword ? 0.6 : 1, cursor: (!passwordsMatch && user.confirmPassword) ? 'not-allowed' : 'pointer'}}>
            Save Changes
          </button>
        </form>

        <hr style={{ margin: '40px 0 20px 0', border: '0', borderTop: '1px solid #eee' }} />

        {/* DELETE ACCOUNT BUTTON */}
        <button onClick={() => setShowDeleteModal(true)} style={deleteBtnStyle}>
          <Trash2 size={18} style={{ marginRight: '8px' }} /> Delete My Account
        </button>
      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <X size={20} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setShowDeleteModal(false)} />
            </div>
            <div style={{ color: '#ef4444', marginBottom: '15px' }}>
                <AlertCircle size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Are you absolutely sure?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowDeleteModal(false)} style={cancelBtnStyle}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={confirmBtnStyle}>
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const labelStyle = { fontWeight: '600', color: '#374151', fontSize: '13px', textTransform: 'uppercase' };
const inputWrapper = { position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '15px', marginTop: '5px' };
const inputStyle = { padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', width: '100%', color: '#4b5563', outline: 'none' };
const infoBoxStyle = { ...inputStyle, marginBottom: '15px', marginTop: '5px', backgroundColor: '#f3f4f6' };
const uploadIconStyle = { position: 'absolute', bottom: '0', right: '0', backgroundColor: '#3b82f6', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' };
const eyeIconStyle = { position: 'absolute', right: '12px', cursor: 'pointer', color: '#9ca3af', display: 'flex' };
const saveBtnStyle = { marginTop: '10px', width: '100%', padding: '14px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' };
const deleteBtnStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

// Modal Specific Styles
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' };
const modalBoxStyle = { backgroundColor: 'white', padding: '25px', borderRadius: '16px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' };
const cancelBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#475569', fontWeight: '600', cursor: 'pointer' };
const confirmBtnStyle = { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: '600', cursor: 'pointer' };

export default Profile;