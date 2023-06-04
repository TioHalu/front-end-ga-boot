import Base from "../../layouts/base";
import styles from "./index.module.scss";
import KotakService from "@/component/elements/KotakService";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GitHubIcon from "@mui/icons-material/GitHub";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useCallback, useEffect, useState } from "react";
import { UseAppSelector } from "@/redux/hooks";
import { API } from "@/configs";
import { FiGitlab, FiKey } from "react-icons/fi";
import axios from "axios";

export interface Services {
  name: string;
  namespace: string;
  podStatuses: any;
  ingressHosts: string;
}

export default function ServicesFeature() {
  const [services, setServicesData] = useState<Services[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const user = UseAppSelector((state: any) => state.authLogin);
  const datas = UseAppSelector((state: any) => state.services);

  const getAllServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API.services, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });
      setServicesData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user.user?.data?.token]);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const listData = services?.map((item, i) => {
    return {
      children: [
        {
          icon: <WidgetsIcon className="text-[#757575]" />,
          title: item.name,
        },
        {
          icon: <PermIdentityIcon className="text-[#757575]" />,
          title: item.namespace,
        },
        {
          icon: <GitHubIcon className="text-[#757575]" />,
          title: item.podStatuses[0].imageName,
        },
        {
          icon: <MonitorHeartIcon className="text-[#757575]" />,
          title: ({ value = item.podStatuses[0].status }) => {
            if (value === "Running") {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#D5ECD6] text-[#20B038]">
                  running
                </div>
              );
            } else if (value === "Pending") {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FCEFCF] text-[#FBBF24]">
                  pending
                </div>
              );
            } else {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FEE2E2] text-[#F87171]">
                  error
                </div>
              );
            }
          },
        },
        {
          icon: <InsertLinkIcon className="text-[#757575]" />,
          title: item.ingressHosts[0],
        },
      ],
      button: "Menuju Link",
      link: `http://${item.ingressHosts[0]}`,
    };
  });
  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Services</h1>
      </div>
      <div className="w-full grid grid-cols-3 gap-[24px]">
        {listData?.map((item, i) => (
          <KotakService key={i}>
            {item.children.map((child, _) => (
              <div key={__filename} className="flex gap-[14px]">
                {child.icon}
                <span
                  className={`font-roboto text-[16px] text-[#757575] ${styles.truncate}`}
                  title={
                    typeof child.title === "function"
                      ? child.title(i)
                      : child.title
                  }
                >
                  {typeof child.title === "function"
                    ? child.title(i)
                    : child.title}
                </span>
              </div>
            ))}
            <a
              className="w-full bg-[#20B038] rounded-[24px] text-white py-[8px] text-center"
              //make link to new tab
              target="_blank"
              href={item.link}
            >
              {item.button}
            </a>
          </KotakService>
        ))}
      </div>
    </Base>
  );
}
