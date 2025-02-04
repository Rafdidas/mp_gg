import { FC } from "react";
import { Event } from "../../types/board.types";
import EventListItem from "./eventListItem";

interface EventListProps {
  eventList: Event[];
}

const EventList: FC<EventListProps> = ({ eventList }) => {
  return (
    <div>
      {eventList.map((list) => {
        return (
          <li key={list.notice_id} style={{ borderBottom: "1px solid #aaa" }}>
            <EventListItem list={list} />
          </li>
        );
      })}
    </div>
  );
};

export default EventList;
