import dynamic from "next/dynamic";
import Loader from "@/component/elements/Loader";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../component/pages/Deploy"),
  { loading: () => <Loader /> }
);


export default function Index() {
  return <DynamicComponentWithNoSSR />
}