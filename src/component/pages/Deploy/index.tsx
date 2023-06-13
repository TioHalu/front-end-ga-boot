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
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import Input from "@/component/elements/Input";
import { AiFillProject, AiOutlineMail } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { Modal } from "@nextui-org/react";
import MyModal from "@/component/elements/Modal";
import {
  BsBoxSeam,
  BsFillClipboard2Fill,
  BsFillTagsFill,
  BsStack,
} from "react-icons/bs";
import { FiKey, FiTrash } from "react-icons/fi";
import { FaDatabase } from "react-icons/fa";
import { AiOutlineFileAdd, AiOutlinePlusCircle } from "react-icons/ai";

const Terminal = lazy(() => import("@/component/elements/Terminal"));
export interface DeployProps {
  name: string;
  namespace: string;
  status: string;
  restarts: string;
  image: string;
  creationTimestamp: Date;
}

type ImageRegistry = {
  id: number;
  name: string;
  path: string;
  project_id: number;
  location: string;
};

type Deploy = {
  devName: string;
  namespaces: string;
  servicesName: string;
  images?: string;
  demoData: boolean;
  autoSyncImages: boolean;
};

type ImageTag = {
  name: string;
  path: string;
  location: string;
};

export default function Deploy() {
  const [loading, setLoading] = useState(false);
  const [modalDeploy, setModalDeploy] = useState(false);
  const [deploy, setDeploy] = useState<DeployProps[] | null>();
  const [state, setState] = useState<any>([
    {
      open: false,
      type: "",
      nameSpace: "",
      podName: "",
    },
  ]);
  const { open, type, nameSpace, podName } = state;
  const user = UseAppSelector((state: any) => state.authLogin);

  const [addons, setAddons] = useState<
    { id: number; key: string; addons: string }[]
  >([]);
  const [env, setEnv] = useState<{ id: number; key: string; value: string }[]>(
    []
  );
  const [images, setImages] = useState<
    { devName: string; repositoryName: string; projectID: number }[]
  >([]);

  const getImageName = async () => {
    try {
      const res = await axios(API.gitlabImages, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });
      setImages(res.data.data);
    } catch (error: any) {
      console.log(
        "🚀 ~ file: index.tsx:36 ~ getImageName ~ error:",
        error.message
      );
    }
  };

  const [imageRegistry, setImageRegistry] = useState<ImageRegistry[]>([]);
  const getPath = async (id: number) => {
    console.log("masuk");
    try {
      const res = await axios(API.gitlabImages + "/project?projectID=" + id, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });

      setImageRegistry(res.data.data);
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:224 ~ getPath ~ error:", error);
    }
  };
  const [path, setPath] = useState<string>();
  const [location, setLocation] = useState<string>();

  const [forTag, setForTag] = useState<{ project_id: number; id: number }>();

  useEffect(() => {
    getImageName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<Deploy>({
    initialValues: {
      devName: user?.user.data.name,
      namespaces: user?.user.data.namespaces,
      servicesName: "",
      images: "",
      demoData: false,
      autoSyncImages: false,
    },
    onSubmit: async (values) => {
      delete values.images;
      console.log({ ...values, location });
    },
  });

  const onChangeAddons = (id: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const copyAddons: Array<any> = [...addons];
      copyAddons[id][e.target.name] = e.target.value;
      setAddons(copyAddons);
    };
  };

  const addMoreAddons = () => {
    setAddons((prev) => [...prev, { id: Date.now(), key: "", addons: "" }]);
  };

  const deleteAddons = (id: number) => {
    return () => {
      const filtered = addons.filter((a) => a.id !== id);
      setAddons(filtered);
    };
  };

  const onChangeEnv = (id: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const copyEnv: Array<any> = [...env];
      copyEnv[id][e.target.name] = e.target.value;
      setEnv(copyEnv);
    };
  };

  const addMoreEnv = () => {
    setEnv((prev) => [...prev, { id: Date.now(), key: "", value: "" }]);
  };

  const deleteEnv = (id: number) => {
    return () => {
      const filtered = env.filter((a) => a.id !== id);
      setEnv(filtered);
    };
  };

  const closeDeployModal = () => {
    setModalDeploy(false);
    setAddons([]);
    setEnv([]);
    setImageRegistry([]);
    formik.resetForm();
  };

  const getAllDeployment = useCallback(async () => {
    try {
      const res = await axios.get(API.deployment, {
        headers: {
          "auth-token": user?.user?.data?.token,
        },
      });
      setDeploy(res.data.data);
      console.log(
        "🚀 ~ file: index.tsx:63 ~ getAllDeployment ~ res.data.data:",
        res.data.data
      );
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
            <button
              onClick={() =>
                setState({
                  ...state,
                  open: !open,
                  type: "log",
                  nameSpace: data.namespace,
                  podName: data.name,
                })
              }
            >
              <DehazeIcon className="text-blue" />
            </button>
            <button
              onClick={() =>
                setState({
                  ...state,
                  open: !open,
                  type: "exec",
                  nameSpace: data.namespace,
                  podName: data.name,
                })
              }
            >
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

  const [tags, setTags] = useState<ImageTag[]>();
  useEffect(() => {
    if (location) {
      (async () => {
        const res = await axios(
          API.gitlabTagImages +
            `?projectID=${forTag?.project_id}&registryID=${forTag?.id}`,
          {
            headers: {
              "auth-token": user?.user?.data?.token,
            },
          }
        );
        setTags(res.data.data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Base>
      <div className={styles.wrapper}>
        <h1>Deployment</h1>
        <Button onClick={() => setModalDeploy(true)}>+ Deploy</Button>
      </div>
      <div className={styles.tableWrapper}>
        <Table data={dataTable} pageSize={10} loading={loading} />
      </div>

      {/* Modal deploy */}
      <MyModal width="670px" open={modalDeploy} onClose={closeDeployModal}>
        <form onSubmit={formik.handleSubmit}>
          <Input
            variant="form"
            label="Developer Name"
            errors={formik.touched.devName && formik.errors.devName}
            onChange={formik.handleChange}
            disabled={user.user.data.roleId !== 1}
            value={formik.values.devName}
            icon={<PersonIcon />}
            name="devName"
          />

          <Input
            variant="form"
            label="Services Name"
            errors={formik.touched.servicesName && formik.errors.servicesName}
            onChange={formik.handleChange}
            value={formik.values.servicesName}
            icon={<BsBoxSeam className="ml-1" size={22} />}
            name="servicesName"
          />

          <div className="flex items-center space-x-4">
            <div className="relative w-full">
              <Input
                variant="select"
                name="images"
                label="Images"
                placeholder="Pilih images"
                errors={formik.touched.images && formik.errors.images}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("images", e.target.value);
                  const findImage = images.find(
                    (image) => image.repositoryName === e.target.value
                  );

                  if (e.target.value) {
                    getPath(findImage?.projectID as number);
                  }
                }}
                options={images?.map((image) => {
                  return {
                    label: image.repositoryName,
                    value: image.repositoryName,
                  };
                })}
                icon={<FaDatabase className="ml-1" size={22} />}
                selected={formik.values.images}
              />
              {imageRegistry.length > 0 && (
                <div className="absolute -right-28 top-0 w-60 p-4 rounded-md bg-blue-200 z-30">
                  <Input
                    variant="select"
                    name="path"
                    label="Branch"
                    placeholder="Pilih Branch"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPath(e.target.value);
                      const findImage = imageRegistry.find(
                        (image) => image.path === e.target.value
                      );
                      setLocation(findImage?.location);
                      setForTag({
                        project_id: findImage?.project_id as number,
                        id: findImage?.id as number,
                      });

                      setImageRegistry([]);
                    }}
                    errors={formik.touched.images && formik.errors.images}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // 	formik.setFieldValue('images', e.target.value)
                    // 	const findImage = images.find(image => image.repositoryName === e.target.value)
                    // 	setPID(findImage?.projectID)
                    // }}
                    options={imageRegistry?.map((image) => {
                      return {
                        label: image.path,
                        value: image.path,
                      };
                    })}
                    // icon={<FaDatabase className="ml-1" size={22} />}
                    selected={path}
                  />
                </div>
              )}
            </div>
            <Input
              variant="select"
              name="tags"
              label="Tags"
              placeholder="Pilih Tags"
              disabled={!location && !tags}
              // errors={formik.touched.email && formik.errors.email}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
              options={tags?.map((tag) => {
                return {
                  label: tag.name,
                  value: tag.name,
                };
              })}
              icon={<BsFillTagsFill className="ml-1" size={22} />}
              // selected={formik.values.email}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Input
              variant="select"
              name="images"
              label="Images Pull Secret"
              // errors={formik.touched.email && formik.errors.email}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => formik.setFieldValue('email', e.target.value)}
              // options={users?.map(user => {
              // 	return {
              // 		label: user.email,
              // 		value: user.email,
              // 	}
              // })}
              icon={<FiKey className="ml-1" size={22} />}
              // selected={formik.values.email}
            />
            <Input
              variant="form"
              name="namespaces"
              label="Namespaces"
              onChange={formik.handleChange}
              disabled={user.user.data.roleId !== 1}
              errors={formik.touched.namespaces && formik.errors.namespaces}
              value={formik.values.namespaces}
              icon={<BsFillClipboard2Fill className="ml-1" size={22} />}
            />
          </div>

          <Input
            variant="form"
            label="Custom Odoo Addons"
            // errors={formik.touched.repositoryName && formik.errors.repositoryName}
            // onChange={formik.handleChange}
            // value={formik.values.repositoryName}
            icon={<AiOutlineFileAdd className="ml-1" size={22} />}
            name="repositoryName"
          />

          <div className="flex items-center space-x-4">
            <Input
              variant="form"
              type="number"
              label="Storage"
              // errors={formik.touched.repositoryName && formik.errors.repositoryName}
              // onChange={formik.handleChange}
              // value={formik.values.repositoryName}
              icon={<FaDatabase className="ml-1" size={22} />}
              name="storage"
            />
            <Input
              variant="form"
              type="number"
              label="Replicas"
              // errors={formik.touched.repositoryName && formik.errors.repositoryName}
              // onChange={formik.handleChange}
              // value={formik.values.repositoryName}
              icon={<BsStack className="ml-1" size={22} />}
              name="replicas"
            />

            <Input
              variant="toggle"
              label="Auto Sync Images"
              onChange={() =>
                formik.setFieldValue(
                  "autoSyncImages",
                  !formik.values.autoSyncImages
                )
              }
              name="autoSyncImages"
              value={formik.values.autoSyncImages}
            />

            <Input
              variant="toggle"
              label="Demo Data"
              // errors={formik.touched.repositoryName && formik.errors.repositoryName}
              onChange={() =>
                formik.setFieldValue("demoData", !formik.values.demoData)
              }
              name="demoData"
              value={formik.values.demoData}
            />
          </div>

          <div>
            <label className="font-secondary font-bold block">
              Addons Services
            </label>
            {addons.length > 0 &&
              addons.map((a, id) => (
                <>
                  <div className="flex items-center space-x-4" key={a.id}>
                    <Input
                      variant="form"
                      // label="Developer Name"
                      // errors={formik.touched.repositoryName && formik.errors.repositoryName}
                      onChange={onChangeAddons(id)}
                      value={a.key}
                      name="key"
                    />
                    <Input
                      variant="select"
                      name="addons"
                      placeholder="Select Addons"
                      // label="Images Pull Secret"
                      // errors={formik.touched.email && formik.errors.email}
                      onChange={onChangeAddons(id)}
                      options={[
                        {
                          label: "tes1",
                          value: "tes1",
                        },
                        {
                          label: "tes2",
                          value: "tes2",
                        },
                      ]}
                      selected={a.addons}
                    />
                    <button onClick={deleteAddons(a.id)}>
                      <FiTrash size={22} className="text-blue-500" />
                    </button>
                  </div>
                </>
              ))}
            <button
              onClick={addMoreAddons}
              className="flex text-blue-500 items-center space-x-2 border-2 rounded-lg px-4 py-1 border-blue-500 font-semibold"
            >
              <AiOutlinePlusCircle size={22} />{" "}
              <span>
                {addons.length > 0 ? "Add More Addons" : "Addons Services"}
              </span>
            </button>
          </div>
          <div className="mt-4">
            <label className="font-secondary font-bold block">
              Environment Variable
            </label>
            {env.length > 0 &&
              env.map((a, id) => (
                <>
                  <div className="flex items-center space-x-4" key={a.id}>
                    <Input
                      variant="form"
                      // errors={formik.touched.repositoryName && formik.errors.repositoryName}
                      onChange={onChangeEnv(id)}
                      value={a.key}
                      name="key"
                    />
                    <Input
                      variant="form"
                      // errors={formik.touched.repositoryName && formik.errors.repositoryName}
                      onChange={onChangeEnv(id)}
                      value={a.value}
                      name="value"
                    />
                    <button onClick={deleteEnv(a.id)}>
                      <FiTrash size={22} className="text-blue-500" />
                    </button>
                  </div>
                </>
              ))}
            <button
              onClick={addMoreEnv}
              className="flex text-blue-500 items-center space-x-2 border-2 rounded-lg px-4 py-1 border-blue-500 font-semibold"
            >
              <AiOutlinePlusCircle size={22} />{" "}
              <span>
                {env.length > 0 ? "Add More Variable" : "Environment Variable"}
              </span>
            </button>
          </div>

          <div className="flex justify-center items-center space-x-6 mt-6">
            <button
              onClick={closeDeployModal}
              className="px-8 py-2 rounded-2xl border-2 border-red text-red"
              type="button"
            >
              Batal
            </button>
            <button
              className="px-8 py-2 rounded-2xl bg-green text-white"
              type="submit"
            >
              Deploy
            </button>
          </div>
        </form>
      </MyModal>

      <Modal
        open={open}
        onClose={() => setState({ ...state, open: !open })}
        width="100%"
        blur
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Modal.Body className={styles.modal}>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Terminal
                socketUrl={`wss://api-gaboot.adaptivenetlab.site/v1/${type}/${nameSpace}/${podName}`}
                type={type}
              />
            </Suspense>
          </div>
        </Modal.Body>
      </Modal>
    </Base>
  );
}
