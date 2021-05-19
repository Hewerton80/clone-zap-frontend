import { FormEvent, useCallback, useContext, useMemo, useState } from 'react';
import { Container } from './styles';
import { IMaskInput } from 'react-imask';
import { authContex } from '../../conexts/authContext';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { colors } from '../../styles/colors';
import Redirect from '../Redirect';

function InsertNumberContainer() {

  const { isSinged, isLoadResponse, singIn } = useContext(authContex);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singIn({ phone, name, password })
  }, [phone, name, password]);

  const isValid = useMemo(() =>
    phone.match(/^\([1-9]{2}\) [0-9]{5}\-[0-9]{4}$/) && !!name && !!password
    , [phone, name, password]);

  if(isSinged){
    return <Redirect url={'/home'}/>
  }

  return (
    <Container>
      <div>
        <header>
          <h2>Informe seu nome, número de telefone e uma senha</h2>
        </header>
        <form onSubmit={handleSubmit}>

          <div className='input-wrapper'>
            <input
              type='text'
              value={name}
              placeholder='Seu nome'
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='input-wrapper'>
            <span className='prefix'>+55</span>
            <IMaskInput
              mask='(00) 00000-0000'
              lazy={false}
              type='text'
              value={phone}
              placeholder='seu número'
              onAccept={(value: string) => setPhone(value)}
            />
          </div>

          <div className='input-wrapper'>
            <input
              type='password'
              value={password}
              placeholder='Sua senha'
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type='submit' disabled={!isValid || isLoadResponse}>
            {
              isLoadResponse ?
                <Loader
                  type="Circles"
                  color={colors.primary}
                  height={25}
                  width={25}
                />
                :
                'Prosseguir'
            }
          </button>

        </form>
      </div>
    </Container>
  );
};

export default InsertNumberContainer;
