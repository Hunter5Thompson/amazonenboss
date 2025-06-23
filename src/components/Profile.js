import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: e.target.name.value,
      email: e.target.email.value,
    };
    
    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    alert("Profile updated successfully!");
  };

  if (!user) {
    return (
      <div className="profile">
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            defaultValue={user.name || ""} 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            defaultValue={user.email || ""} 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={user.username || ""} 
            disabled 
          />
          <small>(Username cannot be changed)</small>
        </div>
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;