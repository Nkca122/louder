import mongoose from "mongoose";
const { Schema, Document } = mongoose;

export interface IEvent {
  title?: string | null;
  date?: string | null;
  venue?: string | null;
  description?: string | null;
  link?: string | null;
  image?: string | null;
}

const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: String,
    },
    description: {
      type: String,
    },
    venue: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
