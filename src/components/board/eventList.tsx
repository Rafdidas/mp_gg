import { FC } from "react";
import { Event } from "../../types/board.types";
import EventListItem from "./eventListItem";

interface EventListProps {
  eventList: Event[];
}

const EventList: FC<EventListProps> = ({ eventList }) => {
  console.log(eventList);
  return (
    <div>
      <h2>진행 중인 이벤트 목록</h2>
      <ul>
        {eventList.map((list) => {
          return (
            <li key={list.notice_id} style={{ borderBottom: "1px solid #aaa" }}>
              <EventListItem list={list} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventList;
