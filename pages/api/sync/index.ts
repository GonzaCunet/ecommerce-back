import { NextApiRequest, NextApiResponse } from "next";
import { Airtablebase } from "lib/airtable";
import { client, indexProduct } from "lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  //   const { offset, limit } = getOffsetAndLimitFromReq(req, 100, 10000);
  Airtablebase("Furniture")
    .select({ pageSize: 10 })
    .eachPage(
      async function (records, fetchNextPage) {
        const objects = records.map((r) => {
          return { objectID: r.id, ...r.fields };
        });
        const index = client.initIndex(indexProduct);
        await index.saveObjects(objects);

        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("termino");
        res.status(200).send({ message: "ok" });
      }
    );
}
