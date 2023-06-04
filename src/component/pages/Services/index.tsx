import Base from "../../layouts/base";
import { Face } from "@mui/icons-material";
import styles from "./index.module.scss";
import KotakService from "@/component/elements/KotakService";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GitHubIcon from "@mui/icons-material/GitHub";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
export default function Deploy() {
  const listData = [
    {
      children: [
        {
          icon: <WidgetsIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <PermIdentityIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <GitHubIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <MonitorHeartIcon className="text-[#757575]" />,
          title: (value: number) => {
            if (value === 0) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#D5ECD6] text-[#20B038]">
                  running
                </div>
              );
            } else if (value === 1) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FEEFEF] text-[#F44336]">
                  stopped
                </div>
              );
            } else if (value === 2) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FFF3CD] text-[#FFC107]">
                  pending
                </div>
              );
            }
          },
        },
        {
          icon: <InsertLinkIcon className="text-[#757575]" />,
          title: "sdsds",
        },
      ],
      button: "sdsds",
      link: "/",
    },
    {
      children: [
        {
          icon: <WidgetsIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <PermIdentityIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <GitHubIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <MonitorHeartIcon className="text-[#757575]" />,
          title: (value: number) => {
            if (value === 0) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#D5ECD6] text-[#20B038]">
                  running
                </div>
              );
            } else if (value === 1) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FEEFEF] text-[#F44336]">
                  stopped
                </div>
              );
            } else if (value === 2) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FFF3CD] text-[#FFC107]">
                  pending
                </div>
              );
            }
          },
        },
        {
          icon: <InsertLinkIcon className="text-[#757575]" />,
          title: "sdsds",
        },
      ],
      button: "sdsds",
      link: "/",
    },
    {
      children: [
        {
          icon: <WidgetsIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <PermIdentityIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <GitHubIcon className="text-[#757575]" />,
          title: "sdsds",
        },
        {
          icon: <MonitorHeartIcon className="text-[#757575]" />,
          title: (value: number) => {
            if (value === 0) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#D5ECD6] text-[#20B038]">
                  running
                </div>
              );
            } else if (value === 1) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FEEFEF] text-[#F44336]">
                  stopped
                </div>
              );
            } else if (value === 2) {
              return (
                <div className="py-[3px] px-[5px] rounded-[8px] bg-[#FFF3CD] text-[#FFC107]">
                  pending
                </div>
              );
            }
          },
        },
        {
          icon: <InsertLinkIcon className="text-[#757575]" />,
          title: "sdsds",
        },
      ],
      button: "sdsds",
      link: "/",
    },
  ];
  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Services</h1>
      </div>
      <div className="w-full grid grid-cols-3 gap-[24px]">
        {listData.map((item, i) => (
          <KotakService key={i}>
            {item.children.map((child, _) => (
              <div key={__filename} className="flex gap-[14px]">
                {child.icon}
                <span className="font-roboto text-[16px] text-[#757575]">
                  {typeof child.title === "function"
                    ? child.title(i)
                    : child.title}
                </span>
              </div>
            ))}
            <a
              className="w-full bg-[#20B038] rounded-[24px] text-white py-[8px] text-center"
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
