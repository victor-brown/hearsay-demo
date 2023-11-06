/* eslint-disable @typescript-eslint/no-throw-literal */
import express from "express";
import bodyParser from "body-parser";
import { createError } from "./factories/ErrorFactory";
import { errorHandler } from "./utils/ErrorHandler";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.post("/sort", (req, res, next) => {
  try {
    const sortKeys: string[] = req.body.sortKeys || undefined;
    const payload = req.body.payload || undefined;

    if (!sortKeys)
      throw createError("BadRequestError", {
        message: 'Property "sortKeys" is required',
      });

    if (!payload)
      throw createError("BadRequestError", {
        message: 'Property "payload" is required',
      });

    const allSortKeysExist = sortKeys.every((key) =>
      // eslint-disable-next-line no-prototype-builtins
      payload.hasOwnProperty(key)
    );

    if (!allSortKeysExist)
      throw createError("BadRequestError", {
        message: "Missing array inside payload",
      });

    for (const key of sortKeys) {
      if (!Array.isArray(payload[key])) {
        throw createError("BadRequestError", {
          message: "The property desired to sort is not an array",
        });
      }

      const arrayToSort: any[] = payload[key];

      if (arrayToSort.every((item) => typeof item === "number")) {
        arrayToSort.sort((a: any, b: any) => a - b);
      } else {
        arrayToSort.sort(undefined);
      }

      payload[key] = arrayToSort;
    }

    res.status(200);
    res.send(payload);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
