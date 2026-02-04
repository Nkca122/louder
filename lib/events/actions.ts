import connectDB from "@/lib/mongodb";
import Event from "@/lib/schemas/event";

export const getEvents = async () => {
  await connectDB();
  return await Event.find({}).lean();
};
