import { Button, SelectChangeEvent } from '@mui/material';
import { Select } from '..';

interface PaginationInfoProps {
  onSelectChange(event: SelectChangeEvent<number | string>): void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  fetchData(event: React.SyntheticEvent<HTMLButtonElement>): void;
  limit: number;
  style?: React.CSSProperties;
}

const perPageOptions = [
  { value: 12, label: 12 },
  { value: 24, label: 24 },
  { value: 48, label: 48 },
];

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  onSelectChange,
  hasPrevPage,
  hasNextPage,
  fetchData,
  limit,
  style,
}) => {
  return (
    <div style={{ display: 'flex', ...style }}>
      <Button onClick={fetchData} disabled={!hasPrevPage} data-page="prev">
        Prev page
      </Button>
      <Button onClick={fetchData} disabled={!hasNextPage} data-page="next">
        Next page
      </Button>
      <div style={{ maxWidth: 250, width: '100%' }}>
        <Select
          label="Per page"
          value={limit}
          onChange={onSelectChange}
          options={perPageOptions}
        />
      </div>
    </div>
  );
};
