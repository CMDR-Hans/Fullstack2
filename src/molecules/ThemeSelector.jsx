import ThemeButton from '../atoms/ThemeButton';
import { ButtonGroup } from 'react-bootstrap';

function ThemeSelector({ theme, setTheme }) {
  const options = [
    { label: 'Oscuro', value: 'dark' },
    { label: 'Claro', value: 'light' },
    { label: 'Daltonico', value: 'daltonic' },
  ];

  return (
    <ButtonGroup className="theme-selector" aria-label="Selección de tema">
      {options.map((option) => (
        <ThemeButton
          key={option.value}
          label={option.label}
          isActive={theme === option.value}
          onClick={() => setTheme(option.value)}
        />
      ))}
    </ButtonGroup>
  );
}

export default ThemeSelector;
