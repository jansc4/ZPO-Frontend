import React, { useState } from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import Rental from '../rental/Rental';
import './RentalList.css';
import { GetRentalDto } from '../api/dto/rental.dto';

interface RentalListProps {
  rentals: GetRentalDto[];
}

function RentalList({ rentals }: RentalListProps) {
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="rental-list-container">
      <List
        className="rental-list"
        subheader={
          <ListSubheader component="div" className="rental-list-header">
            Rental List
          </ListSubheader>
        }
      >
        {rentals.map((rental, index) => (
          <ListItem key={index} dense button onClick={handleToggle(index)}>
            <Checkbox
              edge="start"
              checked={checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
            />
            <div className="rental-list-item">
              <Rental
                loanId={rental.loanId || 0}
                book={rental.book || null}
                user={rental.user || null}
                rentalDate={rental.rentalDate || null}
                endRentalDate={rental.endRentalDate || null}
                returnDate={rental.returnDate || null}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RentalList;
