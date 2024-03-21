import { useContext } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthContext from '../../context/Auth';

import './index.css';

function Login() {
  const { error, loading, login } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = Object.fromEntries(new FormData(e.target));

    login(username, password);
  };

  return (
    <div className='Login'>
      <form className='Login__form' onSubmit={onSubmit}>
        <h2>Please login</h2>
        <Input name='username' label='Username' />
        <Input name='password' label='Password' type='password' />
        <Button disabled={loading} type='submit'>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
        {error && <p className='Login__error'>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
