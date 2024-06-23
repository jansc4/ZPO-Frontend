import './Warning.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import React from 'react';

interface WarningProps {
  message: string;
  path: string;
  onClose: () => void; // Dodaj prop onClose
}

const Warning: React.FC<WarningProps> = ({ message, path, onClose }) => {
  const handleOKClick = () => {
    onClose(); // Wywołaj funkcję onClose po kliknięciu OK
  };

  return (
    <div className="container">
      <div className="warning-box">
        <p>{message}</p>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={path}
          className="button"
          onClick={handleOKClick} // Dodaj obsługę kliknięcia dla przycisku OK
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default Warning;
