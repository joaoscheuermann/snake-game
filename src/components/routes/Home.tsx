import { Link } from "react-router";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-screen"
      gap="9"
    >
      <Heading size="9" className="mb-8">
        Snake!
      </Heading>
      <Text>Click in the Start Game button to start playing</Text>
      <Button asChild size="3" variant="surface">
        <Link to="/play">Start Game</Link>
      </Button>
    </Flex>
  );
}
