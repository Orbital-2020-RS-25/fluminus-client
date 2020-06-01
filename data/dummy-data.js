import ScheduleItem from "../models/ScheduleItem";
import ModuleItem from "../models/ModuleItem";
import AnnouncementItem from "../models/AnnouncementItem";

export const SCHEDULEITEMS = [
  new ScheduleItem("c1", "CS1231s", "blue", "Hard"),
  new ScheduleItem("c2", "CS1101s", "red", "ez"),
];

export const MODULEITEMS = [
  new ModuleItem("c1", "CS1231", "blue"),
  new ModuleItem("c2", "CS1101s", "red"),
];

export const ANNOUNCEMENTITEM = [
  new AnnouncementItem(
    "c1",
    'CS1231s',
    "Midterms cancelled",
    "yo yo im proff and im here to say"
  ),
];
