import { NextApiRequest, NextApiResponse } from "next";
import { Airtablebase } from "lib/airtable";
import { client, indexProduct } from "lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  // const { offset, limit } = getOffsetAndLimitFromReq(req, 100, 100000);
  Airtablebase("Furniture")
    .select({
      pageSize: 10,
    })
    .eachPage(async function (records, fetchNextPage) {
      const objects = records.map((r) => {
        return {
          objectID: r.id,
          ...r.fields,
        };
      });

      try {
        const index = client.initIndex(indexProduct);
        await index.saveObjects(objects);
        console.log("siguiente página");
        fetchNextPage();
      } catch (error) {
        res.status(500).json({ message: "error" });
        console.log(error);
      }
      function done(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done");
        res.status(200).json({ message: "done" });
      }
    });
}
