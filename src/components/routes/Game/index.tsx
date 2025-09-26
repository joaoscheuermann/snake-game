import { useEffect } from "react";
import { Container, Flex, Heading, Strong, Text } from "@radix-ui/themes";

import {
  DEFAULT_BOARD_SIZE,
  DEFAULT_FOOD_AMMOUNT,
  DEFAULT_FOOD_SCORE,
  DEFAULT_TICK_DELAY,
} from "../../../constants";

import { GameStatus, useGameStateStore } from "../../../stores/state";

import useGameLoop from "../../../hooks/useGameLoop";
import useEventListener from "../../../hooks/useEventListener";

import Board from "./Board";
import { useNavigate } from "react-router";

export default function Game() {
  const navigate = useNavigate();

  const game = useGameStateStore();
  const status = useGameStateStore((state) => state.status);

  useGameLoop(
    () =>
      game.tick(DEFAULT_BOARD_SIZE, DEFAULT_FOOD_AMMOUNT, DEFAULT_FOOD_SCORE),
    DEFAULT_TICK_DELAY
  );

  // Start the game as soon the screen is available
  useEffect(() => {
    game.start(DEFAULT_BOARD_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ([GameStatus.PlayerLost, GameStatus.PlayerWon].includes(status)) {
      navigate("/game-over");
    }
  }, [navigate, status]);

  useEventListener<KeyboardEvent>("keydown", (e) =>
    game.setDirectionFromKeyboardInput(e.key)
  );

  useEventListener<FocusEvent>("blur", () => game.pause());
  useEventListener<FocusEvent>("focus", () => game.resume());

  return (
    <Container width="100vw" height="100vh">
      <Flex height="100%" width="100%" align="center" justify="center">
        <Flex direction="column" justify="center" gap="3" width="fit-content">
          <Flex justify="between" width="100%" align="end">
            <Heading> Snake! </Heading>
            <Text>
              <Strong>Score:</Strong> {game.score || 0}
            </Text>
          </Flex>
          <Board size={DEFAULT_BOARD_SIZE} />
        </Flex>
      </Flex>
    </Container>
  );
}
