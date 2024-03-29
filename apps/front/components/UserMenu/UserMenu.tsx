import { useState } from 'react';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  Switch,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Form, Formik } from 'formik';

import useAuth from '@/hooks/useAuth';
import {
  UserNotificationsSettings,
  useUpdateUserNotificationsSettings,
} from '@/api/auth';
import { useGetUser } from '@/api/user';
import { pageRoutes } from 'routes';
import { useRouter } from 'next/router';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    handleMenu,
    handleClose,
  };
};

const UserMenu: React.FC = () => {
  const router = useRouter();
  const { anchorEl, handleMenu, handleClose } = useMenu();
  const { user, logout } = useAuth();

  const { data: settings, isLoading } = useGetUser(user?.sub, {
    enabled: !!user?.sub,
  });
  const { mutateAsync } = useUpdateUserNotificationsSettings();

  const updateUserSettings = async (values: UserNotificationsSettings) => {
    await mutateAsync({ userId: user.sub, data: values });
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Button
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        startIcon={<AccountCircleIcon />}
      >
        {user?.login}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Formik
          initialValues={{
            email_notifications: !!settings?.email_notifications,
          }}
          onSubmit={updateUserSettings}
        >
          {({ values, handleChange, submitForm }) => (
            <Form>
              <List
                sx={{ width: 200 }}
                subheader={<ListSubheader>Notifications</ListSubheader>}
              >
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" />
                  <Switch
                    edge="end"
                    name="email_notifications"
                    checked={values.email_notifications}
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    onClick={() =>
                      router.push(`${pageRoutes.editUser}/${user.sub}`)
                    }
                  >
                    Edit
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <Button fullWidth onClick={() => logout()}>
                    Logout
                  </Button>
                </ListItem>
              </List>
            </Form>
          )}
        </Formik>
      </Menu>
    </>
  );
};

export default UserMenu;
