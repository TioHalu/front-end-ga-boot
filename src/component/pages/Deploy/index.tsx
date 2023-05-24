import Base from "../../layouts/base";

import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import Button from "@/component/elements/Button";
import axios from "axios";
import { API } from "@/configs";
import { useCallback, useEffect, useState } from "react";
import { UseAppSelector } from "@/redux/hooks";
import formatDate from "@/utils/formatDate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TerminalIcon from "@mui/icons-material/Terminal";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Modal from "@/component/elements/Modal";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import Input from "@/component/elements/Input";
import { FiGitlab, FiKey } from "react-icons/fi";
import { AiFillProject, AiOutlineMail } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { BsShieldFill, BsFillClipboard2Fill } from "react-icons/bs";
import { toast } from "react-hot-toast";

export interface DeployProps {
  name: string;
  namespace: string;
  status: string;
  restarts: string;
  image: string;
  creationTimestamp: Date;
}

export default function Deploy() {
  const [loading, setLoading] = useState(false);
  const [deploy, setDeploy] = useState<DeployProps[] | null>();
  const user = UseAppSelector((state: any) => state.authLogin);

  const getAllDeployment = useCallback(async () => {
    try {
      const res = await axios.get(API.deployment, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });
      setDeploy(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.user?.data?.token]);

  useEffect(() => {
    getAllDeployment();
  }, [getAllDeployment]);

  const dataTable = [
    {
      title: "Name",
      value: deploy?.map((item) => {
        let name = item.name;
        if (name.length > 15) {
          return name.slice(0, 10);
        }
        return name;
      }),
    },
    {
      title: "Images",
      value: deploy?.map((item) => {
        let image = item.image;
        if (image.length > 15) {
          return image.slice(0, 10);
        }
        return image;
      }),
    },
    {
      title: "Namespaces",
      value: deploy?.map((item) => item.namespace),
    },
    {
      title: "Deploy At",
      value: deploy?.map((item) => {
        let date = formatDate(item.creationTimestamp);
        if (date.length > 10) {
          return date.slice(0, 10);
        }
        return date;
      }),
    },
    {
      title: "Restart",
      value: deploy?.map((item) => item.restarts),
    },
    {
      title: "Status",
      value: deploy?.map((item) => item.status),
    },
    {
      title: "Action",
      value: deploy?.map((data, index) => {
        return (
          <div key={index} className={styles.action}>
            <button>
              <DehazeIcon className="text-blue" />
            </button>
            <button>
              <TerminalIcon className="text-green" />
            </button>
            <button>
              <EditIcon className="text-yellow" />
            </button>
            <button>
              <DeleteIcon className="text-red" />
            </button>
          </div>
        );
      }),
    },
  ];
  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Deployment</h1>
        <Button>+ Deploy</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} loading={loading} />
      </div>
    </Base>
  );
}
