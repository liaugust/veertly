import { Card as MuiCard, CardContent, Typography } from '@mui/material';

interface CardProps {
  title: string;
  subTitle: string;
}

export const Card: React.FC<CardProps> = ({ title, subTitle, children }) => {
  return (
    <MuiCard variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6">{subTitle}</Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
};
