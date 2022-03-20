import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { PaginationInfo, ParticipantsList } from '..';
import { TOTAL_PARTICIPANTS } from '../../constants';
import {
  calculatePageInfo,
  getSearchParams,
  updateSearchParams,
} from '../../helpers';
import { PageInfo } from '../../types/pageInfo.type';

export const Participants: React.FC = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>(() => {
    const { offset = 0, limit = 12 } = getSearchParams();

    return calculatePageInfo(Number(offset), Number(limit), TOTAL_PARTICIPANTS);
  });

  const fetchData = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    setPageInfo((prev) => {
      const isNext = event.currentTarget.dataset.page === 'next';

      const { offset: prevOffset, limit } = prev;

      const offset = isNext
        ? prevOffset + limit
        : prevOffset - limit > 0
        ? prevOffset - limit
        : 0;

      return calculatePageInfo(offset, limit, TOTAL_PARTICIPANTS);
    });
  };

  const onChangePerPage = (event: SelectChangeEvent<number>) => {
    setPageInfo((prev) => {
      return calculatePageInfo(
        prev.offset,
        Number(event.target.value),
        TOTAL_PARTICIPANTS,
      );
    });
  };

  useEffect(() => {
    updateSearchParams({
      offset: pageInfo.offset,
      limit: pageInfo.limit,
    });
  }, [pageInfo.offset, pageInfo.limit]);

  return (
    <div>
      <PaginationInfo
        onSelectChange={onChangePerPage}
        hasPrevPage={pageInfo.hasPrevPage}
        hasNextPage={pageInfo.hasNextPage}
        limit={pageInfo.limit}
        fetchData={fetchData}
        style={{ marginBottom: 30 }}
      />
      <ParticipantsList limit={pageInfo.limit} offset={pageInfo.offset} />
    </div>
  );
};
