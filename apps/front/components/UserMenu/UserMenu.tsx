import { Button } from '@mui/material';

import UserMenuList from './UserMenuList';

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = ({}) => {

  return (
    <div>
      <Button variant="contained">LOGIN</Button>
    </div>
  );
};

export default UserMenu;
