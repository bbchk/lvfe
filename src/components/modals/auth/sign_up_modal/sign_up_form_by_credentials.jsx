// import { useSignUp } from 'features/user/hooks/useSignUp'

import { useState } from 'react'

import s from './sign_up_form_by_credentials.module.scss'

import InputField from 'comps/input_fields/input_field'
import PasswordInputField from 'comps/input_fields/password_input_field'

//todo fix register functionality
const SignUpForm = ({ toggleModal, toggleSignInModal }) => {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const { signUp, isLoading, error } = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault()

    //todo put cart as well
    const localStorageCartJson = JSON.parse(localStorage.getItem('cart'))
    // await signUp(firstName, secondName, email, password, localStorageCartJson)
    if (!error) {
      toggleModal()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.by_credentials} `}>
      <div className={`${s.input_group}`}>
        <InputField
          type='text'
          id='signUpFirstNameInputField'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
          label="Ім'я*"
        ></InputField>
        <InputField
          type='text'
          id='signUpSecondNameInputField'
          value={secondName}
          onChange={(e) => {
            setSecondName(e.target.value)
          }}
          label='Прізвище'
        />
        <InputField
          type='email'
          id='signUpEmailInputField'
          value={email}
          onChange={(e) => {
            1
            setEmail(e.target.value)
          }}
          label='Пошта*'
        />
        <PasswordInputField
          id='signUpPasswordInputField'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          label='Пароль*'
        />
      </div>

      {/* <div id="passwordHelpBlock" className={`form-text`}>
              Ваш пароль має складатися з 8-20 символів, містити букви та чисел і
              не має містити пробілів, спеціальних символів або емодзі.
            </div> */}
      <div className={`form-text`}>
        Реєструючись, ви погоджуєтеся з умовами{' '}
        <a href='/privacy-policy'>
          положення про обробку і захист персональних даних
        </a>
        {` `}та <a href='/terms-of-usage'>угодою користувача</a>
      </div>

      <button
        // disabled={isLoading}
        type='submit'
        className='button_primary '
      >
        Зареєструватись
      </button>
      {/* signIn('credentials', { redirect: false, password: 'password' }) */}

      <a
        className={`text-center d-block ${s.sign_in_link}`}
        href='#'
        onClick={() => {
          toggleModal()
          toggleSignInModal()
        }}
      >
        Я вже зареєстрований
      </a>
    </form>
  )
}

export default SignUpForm
