import React from 'react';
import image from "../../../assets/images/Vector.png"
import logo from "../../../assets/icons/logo.svg"
import Image from 'next/image';
import styles from "./index.module.scss";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import { useRouter } from 'next/router'

export default function Login() {
  let router = useRouter()
  return (
    <div className={styles.root}>
      <Image src={image} alt="background" />
      <div className={styles.wrapper}>
        <Image src={logo} alt="logo" />
        <h3>Masukan Username dan Password</h3>
        <Input variant="biasa" placeholder="Enter Your Username" label="Username"/>
        <Input variant="kata-sandi" placeholder="Enter Your Password" label="Password" />
        <Button onClick={() => router.push("/main/dashboard")}>Login</Button>
      </div>
    </div>
  )
}