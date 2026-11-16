import { handleApiRequest } from '../server/apiHandler.js'

export default function handler(req, res) {
  return handleApiRequest(req, res)
}
