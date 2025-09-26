import React from "react";
import { Grid } from "@radix-ui/themes";

import { Cell } from "./Cell";

interface BoardProps {
  size: number;
}

const Board: React.FC<BoardProps> = ({ size }) => {
  const cells = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = Math.floor(i / size);

    return <Cell key={i} x={x} y={y} />;
  });

  const rows = size.toString();
  const columns = size.toString();

  return (
    <Grid
      rows={rows}
      columns={columns}
      className="border rounded-md"
      overflow="hidden"
    >
      {cells}
    </Grid>
  );
};

export default Board;
