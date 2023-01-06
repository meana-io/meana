import { Button } from '@mui/material';

import useAuth from '@/hooks/useAuth';
import UserMenuList from './UserMenuList';

interface UserMenuProps {}

const USER_ID = 'c11494da-346d-4d54-992a-6d414363252e';

const UserMenu: React.FC<UserMenuProps> = ({}) => {
  const { isAuthenticated, login } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <UserMenuList />
      ) : (
        <Button variant="contained" onClick={() => login(USER_ID)}>
          LOGIN
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
