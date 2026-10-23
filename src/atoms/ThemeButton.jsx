import { Button } from 'react-bootstrap';

function ThemeButton({ label, isActive, onClick }) {
  return (
    <Button
      type="button"
      variant={isActive ? 'primary' : 'outline-light'}
      className={`theme-button ${isActive ? 'theme-button-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default ThemeButton;
