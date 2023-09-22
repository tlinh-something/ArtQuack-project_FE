import React from 'react';

const TwitterSignInButton: React.FC = () => {
  const handleTwitterSignIn = () => {
    // Add your Twitter Sign-In logic here
  };

  return (
    <button onClick={handleTwitterSignIn} className="btn btn-twitter">
      <img src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"></img>
    </button>
  );
};

export default TwitterSignInButton;
