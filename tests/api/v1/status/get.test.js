test("GET to /api/v1/status should return 200", async () => {
  const rs = await fetch("http://localhost:3000/api/v1/status");
  expect(rs.status).toBe(200);
});
