import { Box } from "@radix-ui/themes";
import { useGameStateStore } from "../../../stores/state";
import { equal, type Vector } from "../../../math/vec";

export function Cell(position: Vector) {
  const food = useGameStateStore((state) => state.food);
  const snake = useGameStateStore((state) => state.snake);

  const isFood = food ? equal(position, food) : false;
  const isSnake = snake?.some((segment) => equal(position, segment)) || false;

  const className =
    isFood || isSnake ? (isFood ? "bg-amber-500" : "bg-black") : "bg-gray-50";

  const classNames = ["w-10", "h-10", "border", className];

  return <Box className={classNames.join(" ")}></Box>;
}
