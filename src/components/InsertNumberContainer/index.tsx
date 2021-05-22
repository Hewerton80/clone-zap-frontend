import { FormEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import { Container } from './styles';
import { IMaskInput } from 'react-imask';
import { authContex } from '../../conexts/authContext';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { colors } from '../../styles/colors';
import Redirect from '../Redirect';
import { Regex } from '../../utils/Regex';

function InsertNumberContainer() {

  const router = useRouter();
  const { isSinged, isLoadResponse, loginErr, registerErr, singIn, singUp } = useContext(authContex);

  const [phoneLogin, setPhoneLogin] = useState('');
  const [passwordLogin, setPassordLogin] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSingIn = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singIn({phone: phoneLogin, password: passwordLogin})
  }, [phoneLogin, passwordLogin]);


  const handleSingUp = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singUp({ phone, name, password })
  }, [phone, name, password]);

  const isValidLogin = useMemo(() =>
    phoneLogin.match(Regex.phone) && !!passwordLogin
    , [phoneLogin, passwordLogin]);

  const isValidRegister = useMemo(() =>
    phone.match(Regex.phone) && !!name && !!password
    , [phone, name, password]);

  // useEffect(()=>{
  //   isSinged && router.push('/home');
  // },[isSinged])

  if (isSinged) {
    return <Redirect url={'/home'} />
  }

  return (
    <Container>
      <div>
        <div className='form-wrapper'>
          <form onSubmit={handleSingIn}>
            <header>
              <h2>Já tem conta? Entre com seu número de telefone e senha</h2>
            </header>
            <main>
              <div className='input-wrapper'>
                <span className='prefix'>+55</span>
                <IMaskInput
                  mask='(00) 00000-0000'
                  lazy={false}
                  type='text'
                  value={phoneLogin}
                  placeholder='seu número'
                  onAccept={(value: string) => setPhoneLogin(value)}
                />
              </div>
              <div className='input-wrapper'>
                <input
                  type='password'
                  value={passwordLogin}
                  placeholder='Sua senha'
                  onChange={e => setPassordLogin(e.target.value)}
                />
              </div>
              <span className='err'>{loginErr}</span>
              <button type='submit' disabled={!isValidLogin || isLoadResponse}>
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
            </main>
          </form>
        </div>

        <div className='form-wrapper'>
          <form onSubmit={handleSingUp}>

            <header>
              <h2>Não tem conta? Informe seu nome, número de telefone e uma senha</h2>
            </header>
            <main>
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
              <span className='err'>{registerErr}</span>

              <button type='submit' disabled={!isValidRegister || isLoadResponse}>
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
            </main>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default InsertNumberContainer;
