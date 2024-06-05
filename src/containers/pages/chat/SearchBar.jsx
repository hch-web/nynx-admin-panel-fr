import React, { useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

// STYLES
import styles from 'styles/containers/search-field.module.scss';

// IMAGES
import searchIcon from 'assets/search-icon.png';

// UTILITIES
import { getSorting, transformOptions } from 'utilities/helpers';

function Searchbar({ placeholder, loading, searchApi, setSearchList, setSearchText, searchText }) {
  const debouncedHandleChange = useDebouncedCallback(
    async e => {
      const body = { search: e.target.value };
      const searchResult = await searchApi(body);
      const sortedUsersList = [...transformOptions(searchResult?.data)].sort(
        getSorting('desc', 'last_message_time')
      );
      setSearchList(sortedUsersList);
    },
    [500]
  );

  const handleChange = useCallback(e => {
    setSearchText(e.target.value);
    debouncedHandleChange(e);
  });

  return (
    <Box className={styles.formGroup}>
      <img className={styles.searchIcon} src={searchIcon} alt="Search-Icon" />

      <input
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
        type="search"
        className={styles.searchField}
      />

      {loading && <CircularProgress className={styles.loader} size={20} />}
    </Box>
  );
}

Searchbar.propTypes = {
  placeholder: propTypes.string,
  setSearchText: propTypes.func.isRequired,
  searchText: propTypes.string,
  searchApi: propTypes.func,
  loading: propTypes.bool,
  setSearchList: propTypes.func,
};

Searchbar.defaultProps = {
  placeholder: '',
  searchText: '',
  searchApi: () => {},
  loading: false,
  setSearchList: () => {},
};

export default Searchbar;
