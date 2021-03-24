import express from "express";

const main = async () => {
  const app = express();
  const port = 3000;

  app.get("/", (_, res) => {
    res.json({ msg: "Hello API!" });
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

main().catch((e) => console.log(e.message));
