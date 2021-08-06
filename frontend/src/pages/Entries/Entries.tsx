import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-query';
import { addEntry, fetchProduct } from 'api/entries';
import { AxiosError } from 'axios';
import { useFetchEntries } from 'hooks/useInfiniteEntries';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useStyles } from './Entries.styles';
import {
  CircularProgress,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Fade,
} from '@material-ui/core';
import { Add as AddIcon, ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { DefaultLayout } from 'components/layouts/DefaultLayout/DefaultLayout';

export const Entries = () => {
  const { t, i18n } = useTranslation('entries');
  const classes = useStyles();

  const entriesQuery = useFetchEntries();
  const ref = useIntersectionObserver({
    enabled: !!entriesQuery.hasNextPage,
    onIntersect: entriesQuery.fetchNextPage,
  });

  const [prodId, setProdId] = useState<number | null>(null);

  const { refetch } = useQuery<any, AxiosError>(
    ['product', { id: prodId }],
    fetchProduct,
    {
      enabled: !!prodId,
      refetchOnWindowFocus: false,
    }
  );

  const newEntry = useMutation((entry) => addEntry(entry), {
    onSuccess: () => {
      entriesQuery.refetch();
    },

    onError: (error, vars, ctx) => {
      console.log({ error, vars, ctx });
    },
  });

  const renderEntries = () => {
    if (entriesQuery.isLoading) return <CircularProgress />;
    if (!entriesQuery.isSuccess) return;
    if (entriesQuery.data.pages[0].entries.length === 0) return t('noEntries');
    else
      return (
        <Fade in>
          <TableContainer className={classes.entriesTable}>
            <Table size="small">
              <TableBody>
                {entriesQuery.data.pages.map((page) => {
                  return page.entries.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.productName}
                      </TableCell>
                      <TableCell align="right">
                        {row.price} zł /{' '}
                        {row.unit === 'QUANTITY' ? 'pcs' : '??'}
                      </TableCell>
                      <TableCell align="right">{row.timestamp}</TableCell>
                      <TableCell align="right">
                        {Math.random() > 0.5 ? (
                          <>
                            <div>
                              <ArrowUpward className={classes.arrowUp} />
                            </div>
                            <div>+{Math.random().toFixed(2)}zł</div>
                          </>
                        ) : (
                          <>
                            <div>
                              <ArrowDownward className={classes.arrowDown} />
                            </div>
                            <div>-{Math.random().toFixed(2)}zł</div>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ));
                })}
                <TableRow ref={ref}>
                  {entriesQuery.hasNextPage && (
                    <TableCell colSpan={4}>
                      {entriesQuery.isFetching ? (
                        <>
                          {t('loadingMore')}
                          <CircularProgress />
                        </>
                      ) : (
                        <div
                          onClick={() => {
                            entriesQuery.fetchNextPage();
                          }}
                        >
                          {t('loadMore')}
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Fade>
      );
  };

  return (
    <DefaultLayout>
      {renderEntries()}
      <Fab
        variant="extended"
        color="primary"
        aria-label="add"
        className={classes.addEntryButton}
      >
        <AddIcon className={classes.addEntryButton__icon} />
        {t('addEntryFab')}
      </Fab>
    </DefaultLayout>
  );
};
