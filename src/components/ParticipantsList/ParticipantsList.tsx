import { Grid, Skeleton, Typography } from '@mui/material';
import { useRef } from 'react';
import { Alert, Card } from '..';
import { API_URL } from '../../constants';
import { useFetch, Cache } from '../../hooks';
import { Participant } from '../../types/participant.type';

interface ParticipantsListProps {
  limit: number;
  offset: number;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  limit,
  offset,
}) => {
  const cache = useRef<Cache<Participant[]>>({});
  const url = `${API_URL}/fetchParticipants?offset=${offset}&limit=${limit}`;

  const {
    data: participants,
    loading,
    error,
  } = useFetch<Participant[] | null>(url, {}, cache.current);

  if (error) return <Alert message={error.message} />;

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {loading &&
        Array(limit)
          .fill('')
          .map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Skeleton
                sx={{ bgColor: 'grey.200' }}
                variant="rectangular"
                animation="wave"
                height={120}
              />
            </Grid>
          ))}
      {participants?.map(
        ({ id, firstName, lastName, jobTitle, company, email }) => (
          <Grid item xs={2} sm={4} md={4} key={id}>
            <Card title={`${firstName} ${lastName}`} subTitle={email}>
              <Typography variant="body1">Company name - {company}</Typography>
              <Typography variant="body1">Job title - {jobTitle}</Typography>
            </Card>
          </Grid>
        ),
      )}
    </Grid>
  );
};
