import React from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import User from '../user/User';
import './UsersList.css';
import { GetUserDto } from '../api/dto/user.dto';

interface UserListProps {
  users: GetUserDto[];
  checked: number[];
  setChecked: React.Dispatch<React.SetStateAction<number[]>>;
}

function UserList({ users, checked, setChecked }: UserListProps) {
  const handleToggle = (userId: number) => () => {
    const currentIndex = checked.indexOf(userId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(userId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="user-list-container">
      <List
        className="user-list"
        subheader={
          <ListSubheader component="div" className="user-list-header">
            User List
          </ListSubheader>
        }
      >
        {users.map((user) => (
          <ListItem
            key={user.userId}
            dense
            button
            onClick={handleToggle(user.userId || 0)}
          >
            <Checkbox
              edge="start"
              checked={checked.indexOf(user.userId || 0) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': `checkbox-list-label-${user.userId}`,
              }}
            />
            <div className="user-list-item">
              <User
                userId={user.userId || 0}
                userName={user.userName || ''}
                role={user.role || ''}
                email={user.email || ''}
                name={user.name || ''}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
