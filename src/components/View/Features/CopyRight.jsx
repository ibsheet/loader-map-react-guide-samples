import Typography from '@mui/material/Typography';
import StyleLink from '@mui/material/Link';

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <StyleLink color='inherit' href='https://www.ibsheet.com/'>
        IBMap
      </StyleLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;