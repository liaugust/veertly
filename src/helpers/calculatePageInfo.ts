import { PageInfo } from '../types/pageInfo.type';

export const calculatePageInfo = (
  _offset: number,
  limit: number,
  totalItemsCount: number,
): PageInfo => {
  const offset = _offset < 0 || _offset >= totalItemsCount ? 0 : _offset;

  const hasPrevPage = offset > 0;
  const hasNextPage = offset + limit < totalItemsCount;

  return {
    hasNextPage,
    hasPrevPage,
    offset,
    limit,
  };
};
