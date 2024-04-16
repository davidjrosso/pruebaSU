import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Monthly Hours</Title>
      <Typography component="p" variant="h4">
        245 Hs.
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        social-time
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          🤷‍♂️
        </Link>
      </div>
    </React.Fragment>
  );
}