import { create } from "zustand";
import type { Vector } from "../math/vec";
import vec, { add, contains, equal, random } from "../math/vec";
import { assert } from "../utils";

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export enum GameStatus {
  Stoped,
  Paused,
  Running,
  PlayerWon,
  PlayerLost,
}

interface GameStateStore {
  status: GameStatus;
  snake: Array<Vector> | null;
  food: Vector | null;
  score: number | null;

  direction: Direction | null;

  start: (size: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;

  /** Progresses the game */
  tick: (size: number, ammountOfFood: number, pointPerFood: number) => void;

  setDirectionFromKeyboardInput: (key: string) => void;
}

export const useGameStateStore = create<GameStateStore>((set) => ({
  status: GameStatus.Stoped,
  snake: null,
  food: null,
  score: null,
  direction: null,

  start: (size: number) =>
    set((state) =>
      state.status === GameStatus.Stoped
        ? {
            status: GameStatus.Running,
            // Lazy :D
            snake: [
              vec(Math.floor(size / 2), Math.floor(size / 2)),
              vec(Math.floor(size / 2) - 1, Math.floor(size / 2)),
              vec(Math.floor(size / 2) - 2, Math.floor(size / 2)),
            ],

            // Lazy :D
            food: random(
              [
                vec(Math.floor(size / 2), Math.floor(size / 2)),
                vec(Math.floor(size / 2) - 1, Math.floor(size / 2)),
                vec(Math.floor(size / 2) - 2, Math.floor(size / 2)),
              ],
              vec(0, 0),
              vec(size - 1, size - 1)
            ),
            score: 0,
            direction: Direction.Right,
          }
        : state
    ),

  stop: () =>
    set({
      status: GameStatus.Stoped,
      snake: [],
      food: null,
      score: null,
    }),

  pause: () =>
    set(() => ({
      status: GameStatus.Paused,
    })),

  resume: () =>
    set((state) => ({
      status:
        state.status === GameStatus.Paused ? GameStatus.Running : state.status,
    })),

  tick: (size: number, ammountOfFood: number, pointPerFood: number) =>
    set((state) => {
      // TODO: What if the snake reaches the max size of the board?

      if (state.status !== GameStatus.Running) return state;

      assert(
        state.status !== null &&
          state.direction !== null &&
          state.food !== null &&
          state.snake !== null &&
          state.score !== null
      );

      const bounds = {
        min: vec(0, 0),
        max: vec(size - 1, size - 1),
      };

      const directions = {
        [Direction.Up]: vec(0, -1),
        [Direction.Down]: vec(0, 1),
        [Direction.Left]: vec(-1, 0),
        [Direction.Right]: vec(1, 0),
      };

      const snake = [...state.snake];

      // Calculates the new snake head
      const futureSnakeHead = add(snake[0]!, directions[state.direction]);

      // Checks if it collided with the wall
      if (!contains(futureSnakeHead, bounds.min, bounds.max))
        return {
          status: GameStatus.PlayerLost,
        };

      // Checks if it colided with itself
      if (snake.some((segment) => equal(futureSnakeHead, segment)))
        return {
          status: GameStatus.PlayerLost,
        };

      // Checks if the snake eat the food.
      const eaten = equal(futureSnakeHead, state.food);

      // Adds the head of the snake
      snake.unshift(futureSnakeHead);

      // If the snake did not eat the food, we should remove the tail so it gives a ilusion of movement :D
      if (!eaten) {
        snake.pop();
      }

      const futureFood = eaten
        ? random(snake, bounds.min, bounds.max)
        : state.food;

      const futureScore = eaten ? state.score + pointPerFood : state.score;

      const targetScore = ammountOfFood * pointPerFood;

      return {
        status:
          futureScore >= targetScore ? GameStatus.PlayerWon : state.status,

        // Returns the new snake state
        snake,

        // Generate a new food position
        food: futureFood,

        // Adds one to each
        score: futureScore,
      };
    }),

  setDirectionFromKeyboardInput: (key) =>
    set((state) => {
      function getDirectionFromKeyboardKey(key: string) {
        switch (key) {
          case "ArrowUp":
            return Direction.Up;
          case "ArrowDown":
            return Direction.Down;
          case "ArrowLeft":
            return Direction.Left;
          case "ArrowRight":
            return Direction.Right;
          default:
            return null;
        }
      }

      function isTheOpositeDirection(
        currentDirection: Direction | null,
        desiredDirection: Direction
      ) {
        if (desiredDirection === null || currentDirection === null)
          return false;

        switch (currentDirection) {
          case Direction.Up:
            return desiredDirection === Direction.Down;
          case Direction.Down:
            return desiredDirection === Direction.Up;
          case Direction.Left:
            return desiredDirection === Direction.Right;
          case Direction.Right:
            return desiredDirection === Direction.Left;
          default:
            return false;
        }
      }

      const desiredDirection = getDirectionFromKeyboardKey(key);

      if (desiredDirection === null)
        return {
          direction: state.direction,
        };

      return {
        direction: isTheOpositeDirection(state.direction, desiredDirection)
          ? state.direction
          : desiredDirection,
      };
    }),
}));
