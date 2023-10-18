import express, { Response } from "express";
import cors from "cors";
import { ExternalEvent, SubscriptionBody } from "./types";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 8080;

const openConnections = new Map<string, Response>();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

function runConnection(res: Response) {
  res.write('hello')
  res.write('hello 2')
  res.write('hello 3')
}

app.post("/subscribe", async (req, res) => {
  try {
    const { id } = req.body as SubscriptionBody;

    openConnections.set(id, res)
    runConnection(res)

    req.on("close", () => {
      console.log("Req closed");
      
    })

    res.on("close", () => {
      console.log("Res closed");
    })
  } catch (err) {
    res.status(500).send(`Error in subscription: ${err}`);
  }
});

app.post("/send-event", async (req, res) => {
  try {
    const { id, msg } = req.body as ExternalEvent;
    const connection = openConnections.get(id)
    if(connection) {
      connection.write(msg)
    }
    res.send(`Success`);
  } catch (err) {
    res.status(500).send(`service returned an error: ${err}`);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
