import { Container } from '@mui/material';
import { Header } from '..';

interface MainLayoutProps {
  withHeader?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  withHeader = true,
}) => {
  return (
    <div>
      {withHeader && <Header title="Veertly" />}
      <Container maxWidth="lg" style={{ padding: 30 }}>
        {children}
      </Container>
    </div>
  );
};
