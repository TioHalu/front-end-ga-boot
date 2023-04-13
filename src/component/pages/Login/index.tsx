import React from 'react';
import image from "../../../assets/images/Vector.png"
import logo from "../../../assets/icons/logo.svg"
import Image from 'next/image';
import styles from "./index.module.scss";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { useRouter } from 'next/router'
import { UseAppDispatch, UseAppSelector } from '@/redux/hooks';
import { login, loginFailed, loginRequest, loginSuccess } from './reducer';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';


// export styling vanila
export default function Login({ user }: any) {
  
  const dispatch = UseAppDispatch();
  const selector = UseAppSelector((state: any) => state.authLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let router = useRouter()
  console.log(selector)
  const _handleSubmit = () => {
    dispatch(login({ username, password }))
  }
  useEffect(() => {
    selector?.user && router.push('/main/dashboard')
  }, [selector, router])

  const handleTerbang = () => {
    const button = document.getElementById("test");
    if (button) {
       button.style.transition = "all 1s ease";
        button.style.width = "1440px";
        button.style.height = "600px";
        button.style.position = "absolute";
        button.style.left = "2000px";
    }
    
  }
  const handleBalik = () => {
    const button = document.getElementById("test");
    if (button) {
      button.style.transition = "all 1s ease";
      button.style.width = "100%";
      button.style.height = "100%";
      button.style.position = "initial";
      button.style.left = "-2000px";
      const createMarquee = document.createElement("marquee");
      createMarquee.innerText = "XIXIXIX";
      createMarquee.style.color = "red";
      createMarquee.style.fontSize = "50px";
      createMarquee.style.fontWeight = "bold";
      createMarquee.style.position = "absolute";
      createMarquee.style.top = "50%";
      document.body.appendChild(createMarquee);
    }
  }
  return (
    <div className={styles.root} >
      <Image src={image} alt="background" onMouseEnter={handleBalik}/>
      <div className={styles.wrapper}>
        <Image src={logo} alt="logo" />
        <h3>Masukan Username dan Password</h3>
        <Input variant="biasa" placeholder="Enter Your Username" label="Username" value={username}  onChange={(e:any)=>setUsername(e.target.value)}/>
        <Input variant="kata-sandi" placeholder="Enter Your Password" label="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <div className={styles.button} id="test" onMouseEnter={handleTerbang} >
          <Button onClick={_handleSubmit}>Login</Button>
          </div>
      </div>
    </div>
  )
}

