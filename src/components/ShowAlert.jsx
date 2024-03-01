import Alert from 'react-bootstrap/Alert';


export default function ShowAlert(props) {

  const variant = props.type

  let message = ''

  if (variant === 'danger') {
    message = "Du har redan lagt ett högre bud!"
  } else if(variant === 'success'){
    message = "Ditt bud är lagt!"
  }

  return (
    <>
      <Alert key={variant} variant={variant} >
        {message}
      </Alert>
    </>
  );
}