import mongoose from "mongoose";
const { Schema, Document } = mongoose;

export interface IEvent extends Document {
  title: string;
  image?: string;
  date?: string;
  description?: string;
  venue?: string;
  link?: string;
  createdAt?: Date;
}

const eventSchema = new Schema<IEvent>(
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
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 120,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
