import Base from "../../layouts/base";
import Card from "@/component/elements/Card";
import styles from "./index.module.scss";
import Table from "@/component/elements/Table";
import { useEffect, useState } from "react";
import { UseAppDispatch, UseAppSelector } from "@/redux/hooks";
import {
  getNodes,
  fetchNodes,
  getDeployments,
  getService,
  getImages,
  getPods,
} from "./reducer";
export default function Dashboard() {
  const user = UseAppSelector((state: any) => state.authLogin);
  const datas = UseAppSelector((state: any) => state.dashboard);
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(getNodes({ token: user?.user?.data?.token }));
    dispatch(getDeployments({ token: user?.user?.data?.token }));
    dispatch(getService({ token: user?.user?.data?.token }));
    dispatch(getImages({ token: user?.user?.data?.token }));
    dispatch(getPods({ token: user?.user?.data?.token }));
  }, [dispatch, user?.user?.data?.token]);
  const data = [
    {
      title: "Nodes",
      value: datas?.nodes?.jumlahNode,
      desc: [
        {
          color: "#20B038",
          name: "Ready",
          value: datas?.nodes?.statusNode?.ready,
        },
        {
          color: "#BD081C",
          name: "Not Ready",
          value: "",
        },
      ],
    },
    {
      title: "Pods",
      value: datas?.pod?.jumlahPod,
      desc: [
        {
          color: "#20B038",
          name: "Ready",
          value: datas?.pod?.podStatus?.Running,
        },
        {
          color: "#BD081C",
          name: "Not Ready",
          value: "",
        },
      ],
    },
    {
      title: "Deployment",
      value: datas?.deployments?.jumlahDeployment,
      desc: [
        // {
        //   color: "#20B038",
        //   name: "Ready",
        //   value: 3,
        // },
        // {
        //   color: "#BD081C",
        //   name: "Not Ready",
        //   value: 2,
        // },
      ],
    },
    {
      title: "Services",
      value: datas?.service?.jumlahService,
      desc: [
        // {
        //   color: "#20B038",
        //   name: "Ready",
        //   value: 3,
        // },
        // {
        //   color: "#BD081C",
        //   name: "Not Ready",
        //   value: 2,
        // },
      ],
    },
    {
      title: "Images",
      value: datas?.images?.jumlahImages,
      desc: [
        // {
        //   color: "#20B038",
        //   name: "Ready",
        //   value: 3,
        // },
        // {
        //   color: "#BD081C",
        //   name: "Not Ready",
        //   value: 2,
        // },
      ],
    },
  ];

  const dataTable = [
    {
      title: "Timestamp",
      value: [
        "aduh",
        "aduhd",
        "adudh",
        "aduh",
        "aduh",
        "aduh",
        "aduh",
        "aduhd",
        "adudh",
        "aduh",
        "aduh",
        "aduh",
        "aduh",
        "aduhd",
        "adudh",
        "aduh",
        "aduh",
        "aduh",
        "aduh",
        "aduhd",
        "adudh",
        "aduh",
        "aduh",
        "aduh",
        "aduh",
        "aduhd",
        "adudh",
        "aduh",
        "aduh",
        "aduh",
      ],
    },
    {
      title: "Developer",
      value: ["aduh", "aduh"],
    },
    {
      title: "Repository",
      value: ["test", "tfsfd"],
    },
    {
      title: "Branch",
      value: ["aduh", "aduhd", "adudh", "aduh", "aduh", "aduh"],
    },
    {
      title: "Images",
      value: ["test", "tfsfd"],
    },
    {
      title: "Deploy At",
      value: ["aduh", "aduh"],
    },
    {
      title: "Status",
      value: ["aduh", "aduh"],
    },
  ];
  return (
    <Base>
      <div className={styles.wrapper}>
        {data.map((item, index): any => {
          return (
            <Card
              key={index}
              title={item.title}
              value={item.value}
              desc={item.desc}
            />
          );
        })}
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} />
      </div>
    </Base>
  );
}
