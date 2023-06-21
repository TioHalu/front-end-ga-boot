import React from 'react'
import image from '../../../assets/images/Vector.png'
import logo from '../../../assets/icons/logo.svg'
import Image from 'next/image'
import styles from './index.module.scss'
import Input from '../../elements/Input'
import Button from '../../elements/Button'
import { useRouter } from 'next/router'
import { UseAppDispatch, UseAppSelector } from '@/redux/hooks'
import { login, loginFailed, loginRequest, loginSuccess } from './reducer'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

export default function Login({ user }: any) {
  const dispatch = UseAppDispatch()
  const selector = UseAppSelector((state: any) => state.authLogin)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let router = useRouter()
  console.log(selector)
  const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }
  useEffect(() => {
    selector?.user && router.push('/main/dashboard')
  }, [selector, router])
  return (
    <div className={styles.root}>
      <Image src={image} alt='background' />
      <div className={styles.wrapper}>
        <Image src={logo} alt='logo' />
        <h3>Masukan Username dan Password</h3>
        <form onSubmit={_handleSubmit}>
          <Input
            variant='biasa'
            required={true}
            placeholder='Enter Your Username'
            label='Username'
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <Input
            variant='kata-sandi'
            placeholder='Enter Your Password'
            required={true}
            label='Password'
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <div className={styles.button}>
            <Button onClick={_handleSubmit} type='submit'>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
