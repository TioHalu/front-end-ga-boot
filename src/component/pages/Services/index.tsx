import Base from "../../layouts/base";
import { Face } from "@mui/icons-material";
import styles from "./index.module.scss";
import Button from "@/component/elements/Button";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { UseAppSelector } from "@/redux/hooks";
import { API } from "@/configs";

export interface ServicesProps {
  name: string;
  namespace: string;
  podStatuses: Array<string>;
  status: string;
  imageName: string;
  ingressHost: string;
}

const Card = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "500px",
        height: "311px",
        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.35)",
      }}
      className="bg-white rounded-xl"
    >
      <div className="p-6 flex flex-col">
        <div className="flex flex-row space-y-2 my-4">
          <Face />
          <span>testt</span>
          <Face />
          <span>testt</span>
          <Face />
          <Face />
          <Face />
        </div>
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            gap: "10px",
            position: "absolute",
            width: "468px",
            height: "48px",
            left: "16px",
            top: "246px",
            background: "#20B038",
            borderRadius: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "140%",
              color: "#FAFAFA",
            }}
          >
            Button Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default function Deploy() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServicesProps[] | null>();
  const user = UseAppSelector((state: any) => state.authLogin);

  const getAllServices = useCallback(async () => {
    try {
      const res = await axios.get(API.services, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });
      setServices(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user?.user?.data?.token]);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const dataCard = [
    {
      name: services?.map((item) => item.name),
      namespace: services?.map((item) => item.namespace),
      podStatuses: services?.map((item) => item.podStatuses),
      status: services?.map((item) => item.status),
      imageName: services?.map((item) => item.imageName),
      ingressHost: services?.map((item) => item.ingressHost),
    },
  ];

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Services</h1>
      </div>
      <Card />
    </Base>
  );
}
