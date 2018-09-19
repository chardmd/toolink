import React from "react";
import Button from "@material-ui/core/Button";

import Cached from "@material-ui/icons/Cached";
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) => (
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Cached className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>
);
