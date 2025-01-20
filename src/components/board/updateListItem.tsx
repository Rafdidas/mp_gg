import { Update } from "../../types/board.types";

const UpdateListItem = ({ list }: { list: Update }) => {
  return (
    <div>
      <p>{list.title}</p>
      <p>{list.url}</p>
      <p>{list.notice_id}</p>
      <p>{list.date}</p>
    </div>
  );
};

export default UpdateListItem;
