import dynamic from "next/dynamic";
import Loader from "@/component/elements/Loader";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../component/pages/Member"),
  { loading: () => <Loader /> }
);


export default function Index() {
  return <DynamicComponentWithNoSSR />
}