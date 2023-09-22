import React from 'react';

const GoogleSignInButton: React.FC = () => {
  const handleGoogleSignIn = () => {
    // Add your Google Sign-In logic here
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn btn-google">
      <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"></img>
    </button>
  );
};

export default GoogleSignInButton;
