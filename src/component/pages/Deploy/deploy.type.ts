export interface DeployProps {
  podName: string;
  namespace: string;
  status: string;
  restarts: string;
  image: string;
  creationTimestamp: Date;
  developerName: string;
  name: string;
  serviceNameForDelete: string;
}

export type ImageRegistry = {
  id: number;
  name: string;
  path: string;
  project_id: number;
  location: string;
};

export type DeployForm = {
  devName: string;
  namespace: string;
  serviceName: string;
  images?: string;
  imagePullSecrets: string;
  demoData: boolean;
  autoSyncImages?: boolean;
  pvcSize: number;
  replicas: number;
  imageTag: string;
};

export type ImageTag = {
  name: string;
  path: string;
  location: string;
};

export type SupportServiceType = {
  addons: any;
  key: any;
  name: string;
  developerName: string;
  namespace: string;
  status: string;
  restarts: number;
  image: string;
  creationTimestamp: string;
  serviceNetworkName: string;
};
