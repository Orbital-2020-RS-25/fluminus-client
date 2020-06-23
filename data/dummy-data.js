import ScheduleItem from "../models/ScheduleItem";
import ModuleItem from "../models/ModuleItem";
import AnnouncementItem from "../models/AnnouncementItem";
import FileItem from "../models/FileItem";
import MediaItem from "../models/MediaItem";
import FriendItem from "../models/FriendItem";

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
    "CS1231s",
    "Midterms cancelled",
    "yo yo im proff and im here to say"
  ),
];

export const FILEITEM = [
  new FileItem("c1", "CS1231s", "lecture 1", "lecture1.pdf"),
];

export const MEDIAITEM = [
  new MediaItem("c1", "CS1231s", "lecture 1", "lecture1.raw"),
];

export const FRIENDITEM = [
  new FriendItem("c1", "Peter", "blue"),
  new FriendItem("c2", "X Æ A-12", "red"),
];
