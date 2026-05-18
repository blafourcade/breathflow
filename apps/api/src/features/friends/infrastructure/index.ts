import { storageMode } from "../../../shared/config/runtime";
import {
  memoryFriendRepository,
  memoryUserDirectory,
} from "./friend.memory-repository";
import {
  friendRepository as pgFriendRepository,
  userDirectory as pgUserDirectory,
} from "./friend.repository";

export function getFriendRepository() {
  return storageMode() === "memory" ? memoryFriendRepository : pgFriendRepository;
}
export function getUserDirectory() {
  return storageMode() === "memory" ? memoryUserDirectory : pgUserDirectory;
}
