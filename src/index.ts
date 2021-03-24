import express from "express";

const main = async () => {
  const app = express();
  const port = 3000;

  app.get("/", (_, res) => {
    res.json({ msg: "Hello World!" });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

main().catch((e) => console.log(e.message));
