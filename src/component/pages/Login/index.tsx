import React from 'react';
import image from "../../../assets/images/Vector.png"
import logo from "../../../assets/icons/logo.svg"
import Image from 'next/image';
import styles from "./index.module.scss";
import Input from "../../elements/Input";
import Button from "../../elements/Button"
export default function Login() {
  return (
    <div className={styles.root}>
      <Image src={image} alt="background" />
      <div className={styles.wrapper}>
        <Image src={logo} alt="logo" />
        <h3>Masukan Username dan Password</h3>
        <Input variant="biasa" placeholder="Enter Your Username" label="Username"/>
        <Input variant="kata-sandi" placeholder="Enter Your Password" label="Password" />
        <Button>Login</Button>
      </div>
    </div>
  )
}