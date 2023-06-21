

interface Props {
  children?: React.ReactNode;
}

const KotakService: React.FC<Props> = ({ children} : Props) => {
  return (
    <div className="py-[16px] px-[16px] rounded-[16px] bg-white shadow-lg ">
      <div className="gap-[8px] flex flex-col">{children}</div>
    </div>
  );
}

export default KotakService;