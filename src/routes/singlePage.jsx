import { useParams } from "react-router-dom";

function SinglePage() {
  const { id } = useParams();
  console.log(id);
  return <></>;
}

export default SinglePage;
