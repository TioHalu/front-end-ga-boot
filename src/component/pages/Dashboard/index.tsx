
import Base from '../../layouts/base';
import Card from '@/component/elements/Card';
import styles from "./index.module.scss";
import Table from "@/component/elements/Table"

export default function Dashboard() {
  const data = [
    {
      title: 'Nodes',
      value: 5,
      desc: [
        {
          color: '#20B038',
          name: 'Ready',
          value: 3
        },
        {
          color: '#BD081C',
          name: 'Not Ready',
          value: 2
        }
      ]
    },
    {
      title: 'Deployment',
      value: 5,
      desc: [
        {
          color: '#20B038',
          name: 'Ready',
          value: 3
        },
        {
          color: '#BD081C',
          name: 'Not Ready',
          value: 2
        }
      ]
    },
     {
      title: 'Services',
      value: 5,
      desc: [
        {
          color: '#20B038',
          name: 'Ready',
          value: 3
        },
        {
          color: '#BD081C',
          name: 'Not Ready',
          value: 2
        }
      ]
    },
     {
      title: 'Images',
      value: 5,
      desc: [
        {
          color: '#20B038',
          name: 'Ready',
          value: 3
        },
        {
          color: '#BD081C',
          name: 'Not Ready',
          value: 2
        }
      ]
    }
  ] 

  const dataTable = [
  {
    title: "Timestamp",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh","aduh","aduhd","adudh","aduh","aduh","aduh",]
  },
  {
    title: "Developer",
    value:["aduh","aduh"]
  },
   {
    title: "Repository",
    value:["test","tfsfd"]
  },
  {
    title: "Branch",
    value:["aduh","aduhd","adudh","aduh","aduh","aduh"]
  },
   {
    title: "Images",
    value:["test","tfsfd"]
  },
  {
    title: "Deploy At",
    value:["aduh","aduh"]
    },
   {
    title: "Status",
    value:["aduh","aduh"]
  }
]
  return (
    <Base>
      <div className={styles.wrapper}>
        {
          data.map((item, index):any => {
            return (
              <Card key={index} title={item.title} value={item.value} desc={item.desc} />
            )
          })
        }
      </div>
      <div className={styles.tableWrapper}>
        
        <Table data={dataTable} pageSize={10}/>
      </div>
    </Base>
  )
}