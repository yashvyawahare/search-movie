import React from "react";

const GoBackButton = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <button className="click_button" onClick={reloadPage}>
      Back
    </button>
  );
};

export default GoBackButton;
