import { v4 as uuidv4 } from "uuid";

function generateUuid() {
  return uuidv4();
}

export default { generateUuid };
