import { useCallback, useState } from 'react';

type ConnectionArgs = {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
};

type PageInfo = {
  hasNextPage?: boolean | null;
  hasPreviousPage?: boolean | null;
  startCursor?: string | null;
  endCursor?: string | null;
};

export const useCursorPagination = (take: number, initialArgs?: ConnectionArgs) => {
  const [connectionArgs, setConnectionArgs] = useState<ConnectionArgs>({ first: take, ...initialArgs });

  const next = useCallback(
    (pageInfo: PageInfo) => {
      if (pageInfo.hasNextPage) {
        setConnectionArgs({
          after: pageInfo.endCursor,
          before: null,
          first: take,
          last: null,
        });
      }
    },
    [take],
  );

  const previous = useCallback(
    (pageInfo: PageInfo) => {
      if (pageInfo.hasPreviousPage) {
        setConnectionArgs({
          after: null,
          before: pageInfo.startCursor,
          first: null,
          last: take,
        });
      }
    },
    [take],
  );

  const reset = useCallback(() => {
    setConnectionArgs({ first: take });
  }, [take]);

  return {
    connectionArgs,
    next,
    previous,
    reset,
  };
};
