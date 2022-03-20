import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SelectProps {
  onChange(event: SelectChangeEvent<string | number>): void;
  value: string | number;
  options: {
    value: string | number;
    label: string | number;
  }[];
  label: string;
}

export const Select: React.FC<SelectProps> = ({
  onChange,
  value,
  label,
  options,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={onChange}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
