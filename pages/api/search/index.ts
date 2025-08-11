import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { client } from "lib/algolia";
import { getOffsetAndLimitFromReq } from "lib/requests";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetAndLimitFromReq(req);
    const query = req.query.search as string;

    const response = await client.searchSingleIndex({
      indexName: "products",
      searchParams: {
        query,
        hitsPerPage: limit,
        page: offset > 1 ? Math.floor(offset / limit) : 0,
      },
    });

    res.send({
      results: response.hits,
      pagination: {
        offset,
        limit,
        page: response.page,
        total: response.nbHits,
      },
    });
  },
});
