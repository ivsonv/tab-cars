import database from "@/infra/database";

export default function status(request, response) {
  response.status(200).json({ ok: true });
}
