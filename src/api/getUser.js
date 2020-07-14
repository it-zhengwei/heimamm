import newAxios from "./newAxios"
import { getItem } from "@/utils/local.js"
function getUser() {
  return newAxios({
    url: "/info",
    headers: {
      token: getItem(),
    },
  })
}
export { getUser }
