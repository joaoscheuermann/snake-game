import { Button, Flex, Heading } from "@radix-ui/themes";
import { GameStatus, useGameStateStore } from "../../stores/state";
import { useNavigate } from "react-router";

export default function GameOver() {
  const navigate = useNavigate();
  const game = useGameStateStore();

  const score = useGameStateStore((state) => state.score);
  const status = useGameStateStore((state) => state.status);

  const messages: Record<GameStatus, string | null> = {
    [GameStatus.PlayerWon]: "Congratulations, you won!",
    [GameStatus.PlayerLost]: "You lost, try again!",
    [GameStatus.Stoped]: null,
    [GameStatus.Paused]: null,
    [GameStatus.Running]: null,
  };

  const message = messages[status];

  function handlePlayAgainButton() {
    game.stop();
    navigate("/play");
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen"
      gap="6"
    >
      <Heading size="9" className="mb-4">
        {message}
      </Heading>
      <Heading size="4" className="mb-8">
        Your score: {score}
      </Heading>
      <Button size="3" variant="surface" onClick={handlePlayAgainButton}>
        Play again!
      </Button>
    </Flex>
  );
}
