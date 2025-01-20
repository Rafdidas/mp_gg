import { FC } from "react";
import { Update } from "../../types/board.types";
import UpdateListItem from "./updateListItem";

interface UpdateListProps {
  updateList: Update[];
}

const UpdateList: FC<UpdateListProps> = ({ updateList }) => {
  console.log(updateList);
  return (
    <div>
      <h2>업데이트 목록</h2>
      <ul>
        {/* {updateList.map((list) => {
          return (
            <li key={list.notice_id} style={{ borderBottom: "1px solid #aaa" }}>
              <UpdateListItem list={list} />
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default UpdateList;
