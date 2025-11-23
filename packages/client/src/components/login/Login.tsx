import useDocumentTitle from 'hooks/useDocumentTitle';
import LoginForm from './LoginForm';

function Login() {
  useDocumentTitle('Login');

  return (
    <LoginForm />
  );
}

export default Login;
