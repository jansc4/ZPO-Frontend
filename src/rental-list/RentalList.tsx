import React from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import Rental from '../rental/Rental';
import './RentalList.css';
import { GetRentalDto } from '../api/dto/rental.dto';

interface RentalListProps {
  rentals: GetRentalDto[];
  checked: number[];
  onToggle: (id: number) => void;
}

function RentalList({ rentals, checked, onToggle }: RentalListProps) {
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
        {rentals.map((rental) => (
          <ListItem
            key={rental.loanId}
            dense
            button
            onClick={() => onToggle(rental.loanId || 0)}
          >
            <Checkbox
              edge="start"
              checked={checked.indexOf(rental.loanId || 0) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': `checkbox-list-label-${rental.loanId}`,
              }}
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
