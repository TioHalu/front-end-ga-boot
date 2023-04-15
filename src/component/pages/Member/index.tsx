import Base from "../../layouts/base";
import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
import Modal from "@/component/elements/Modal";
import Input from "@/component/elements/Input";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import { Formik } from "formik";
import { UseAppDispatch, UseAppSelector } from "@/redux/hooks";
import { member, requestMember } from "./reducer";
import { useRef, useEffect } from "react";
export default function Deploy() {
  const [open, setOpen] = useState<boolean>(false);

  const user = UseAppSelector((state: any) => state.authLogin);
  const data = UseAppSelector((state: any) => state.member);
  let devName = data?.member?.data.map((item: any) => item.name);
  let userName = data?.member?.data.map((item: any) => item.username);
  let email = data?.member?.data.map((item: any) => item.email);
  let namespaces = data?.member?.data.map((item: any) => item.namespaces);
  let role = data?.member?.data.map((item: any) => item.roleId);
  let createdAt = data?.member?.data.map((item: any) => {
    let date = new Date(item.createdAt);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let time = date.toLocaleTimeString();
    return `${day}/${month}/${year} - ${time}`;
  });
  let updatedAt = data?.member?.data.map((item: any) => item.updatedAt);

  const dataTable = [
    {
      title: "Developer Name",
      value: devName,
    },
    {
      title: "username",
      value: userName,
    },
    {
      title: "Email",
      value: email,
    },
    {
      title: "Namespaces",
      value: namespaces,
    },
    {
      title: "Role",
      value: role,
    },
    {
      title: "Created At",
      value: createdAt,
    },
    {
      title: "Update At",
      value: updatedAt,
    },
    {
      title: "Action",
      value: ["Tambahin Button Dong"],
    },
  ];
  const dispatch = UseAppDispatch();
  const ref = useRef<any>(null);
  const _handleSubmit = (values: any) => {
    dispatch(member(values));
  };
  useEffect(() => {
    dispatch(requestMember({ token: user?.user?.data?.token }));
  }, [dispatch, user]);
  const renderComponentModal = (helpers: any) => {
    const { handleChange, values, handleSubmit: _handleSubmit } = helpers;
    return (
      <form onSubmit={_handleSubmit}>
        <div className={styles.modalWrapper}>
          <Input
            variant="form"
            label="Nama"
            onChange={handleChange}
            value={values.name}
            icon={<PersonIcon />}
            name="name"
          />
          <Input
            variant="form"
            label="Username"
            onChange={handleChange}
            value={values.username}
            icon={<PersonAddAlt1Icon />}
            name="username"
          />
          <Input
            variant="form"
            label="Password"
            onChange={handleChange}
            value={values.password}
            icon={<KeyIcon />}
            name="password"
          />
          <Input
            variant="form"
            name="email"
            label="Email"
            onChange={handleChange}
            value={values.email}
            icon={<EmailIcon />}
          />
          <Input
            variant="form"
            name="namespaces"
            label="Namespaces"
            onChange={handleChange}
            value={values.namespaces}
            icon={<BadgeIcon />}
          />
          <Input
            variant="form"
            name="roleId"
            label="Role"
            onChange={handleChange}
            value={values.roleId}
            icon={<AdminPanelSettingsIcon />}
          />
          <div className={styles.bottom}>
            <Button className={styles.add} type="submit">
              Tambahkan
            </Button>
            <Button className={styles.batal} onClick={() => setOpen(!open)}>
              Batal
            </Button>
          </div>
        </div>
      </form>
    );
  };

  const renderFormik = () => {
    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          roleId: "",
          namespaces: "",
          username: "",
        }}
        component={renderComponentModal}
        onSubmit={_handleSubmit}
        innerRef={ref}
      />
    );
  };
  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Member</h1>
        <Button onClick={() => setOpen(!open)}>+ tambahkan User</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Modal open={open}>{renderFormik()}</Modal>
        <Table data={dataTable} pageSize={10} />
      </div>
    </Base>
  );
}
