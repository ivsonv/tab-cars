test("GET to /api/v1/status should return 200", async () => {
  const rs = await fetch("http://localhost:3000/api/v1/status");
  expect(rs.status).toBe(200);

  const body = await rs.json();
  expect(body.updated_at).toBeDefined();
  expect(body.updated_at).toEqual(toDateISO(body.updated_at));

  expect(body.database.available_connections).toEqual(99);
  expect(body.database.max_connections).toEqual(100);
  expect(body.database.open_connections).toEqual(1);
  expect(body.database.version).toEqual("16.2");
});

function toDateISO(date) {
  return new Date(date).toISOString();
}
