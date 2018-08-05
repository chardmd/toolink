import { SAVE_USER } from "./constants";

export function saveUser(data) {
  return {
    type: SAVE_USER,
    data
  };
}
