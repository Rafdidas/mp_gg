import { Event } from "../../types/board.types";

const EventListItem = ({ list }: { list: Event }) => {
  return (
    <div>
      <p>{list.title}</p>
      <p>{list.url}</p>
      <p>{list.notice_id}</p>
      <p>{list.date}</p>
    </div>
  );
};

export default EventListItem;
