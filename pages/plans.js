import React from "react";
import { Card } from "semantic-ui-react";

const items = [
  {
    header: "Plan 1",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    price: "1000",
  },
  {
    header: "Plan 2",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    price: "500",
  },
  {
    header: "Plan 3",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    price: "2000",
  },
];

const PlansCard = () => <Card.Group items={items} />;

export default PlansCard;
