import Link from "next/link";

type SubjectContainerProps = {
  title: string;
  source: string;
};

const SubjectContainer = ({ title, source }: SubjectContainerProps) => {
  return (
    <Link href={source} className="hover:text-highlight transition-colors">
      {title}
    </Link>
  );
};

export default SubjectContainer;
