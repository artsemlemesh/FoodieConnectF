import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBadge = ({ count }) => {
  return (
    <IconButton>
      <Badge
        badgeContent={count}
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="bg-blue-500"
      >
        <NotificationsIcon className="text-gray-600" />
      </Badge>
    </IconButton>
  );
};

export default NotificationBadge;