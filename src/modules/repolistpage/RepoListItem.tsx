import { useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  id: string;
  isArchived: boolean;
  owner: string;
};
const RepoListItem = ({ name, id, isArchived, owner }: Props) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/repo/${owner}/${name}/${id}`);
  };
  return (
    <div>
      <p>{name}</p>
      {isArchived && <p>archived</p>}
      <button onClick={handleNavigation}>Details</button>
    </div>
  );
};

export default RepoListItem;
