import { InputBase, TextFieldProps } from '@mui/material';
import styled from '@emotion/styled';
import { Search as SearchIcon } from '@mui/icons-material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginLeft: 0,
  width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: '3rem',
  width: '100%',
}));

const SearchInput: React.FC<TextFieldProps> = ({ onChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchInput;
