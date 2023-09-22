import React from 'react';

const GitHubSignInButton: React.FC = () => {
  const handleGitHubSignIn = () => {
    // Add your GitHub Sign-In logic here
  };

  return (
    <button onClick={handleGitHubSignIn} className="btn btn-github">
      <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"></img>
    </button>
  );
};

export default GitHubSignInButton;
