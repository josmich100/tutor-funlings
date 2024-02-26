import { makeStyles } from '@mui/styles';


export const inputStyles = makeStyles((theme) => ({
  defaultInput: {
    '& .MuiInput-input': {
      borderBottom: '2px solid grey',
      '&:valid': {
        borderBottom: '2px solid green',
      },
      '&:invalid': {
        borderBottom: '2px solid #de864b ',
      },
      '&:valid:focus': {
        borderBottom: '2px solid green',
      },
      '&:invalid:focus': {
        borderBottom: '2px solid red',
      },
      '&:error': {
        borderBottom: '2px solid red',
        color: 'red'
      },
    },

    '& label.Mui-focused': {
      color: '#de864b ',
      fontWeight: 'bold',
    },

    '& .Mui-error': {
      color: 'red',
    }
  },

  filledInput: {
    '& .MuiFilledInput-root': {
      fontSize: 14,
      backgroundColor: '#eeffee',
      borderColor: 'grey',
      padding: 0
    },

    '& .MuiIconButton-root': {
      fontSize: 14,
    },

    '& label': {
      fontSize: 14,
    },

    '& label.Mui-focused': {
      color: '#de864b ',
      fontWeight: 'bold',
    },
  },
}));