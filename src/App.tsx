import * as React from 'react';
import {Box, Button, ChakraProvider, Flex, Heading, Spacer, theme, VStack} from "@chakra-ui/react";

const available_colors = {
  red: "cyan", green: "green", blue: "blue", orange: "orange",
}

type AvailableColor = keyof typeof available_colors;

interface GameButtonProps {
  color: AvailableColor
  onClick: () => void
  isActive: boolean
}

const GameButton: React.FC<GameButtonProps> = ({color, onClick, isActive}) => {
  return <Box key={`${color}-button`} onClick={() => isActive ? onClick() : null}>
    <svg width="200px" height="200px">
      <circle id={color} cx="100" cy="100" r="100" fill={isActive ? `gray` : color}/>
    </svg>
  </Box>
}

const getRandomMember = (arraySource: any[]) => arraySource[Math.floor(Math.random() * arraySource.length)]
const max_missed = 3

const generateGame = (amountOfButtons = 4, startLevel = 1) => {
  const [lost, setLost] = React.useState(false)
  const [missedCount, setMissedCount] = React.useState(0)
  const [clicked, setClicked] = React.useState(false)
  const [start, setStart] = React.useState(false)
  const [activeButton, setActiveButton] = React.useState<AvailableColor>()
  const [buttons] = React.useState(Array.from(Array(amountOfButtons).keys()))
  const [points, setPoints] = React.useState(0)
  React.useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (!clicked) {
          setMissedCount(missedCount + 1)
        }
        if (missedCount >= max_missed) {
          setLost(true)
          setStart(false)
        }
        const nextActiveButton = Object.values(available_colors)[getRandomMember(buttons)] as AvailableColor
        setActiveButton(nextActiveButton)
        setClicked(false)
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start, points, clicked, missedCount]);
  return <VStack>
    {!start && lost && <Heading>{`You lost!`}</Heading>}
    <Heading>{`Score: ${points}`}</Heading>
    {start && <Heading>{`Missed: ${missedCount}/${max_missed}`}</Heading>}
    {lost && <Button onClick={() => {
      setStart(true)
      setPoints(0)
      setMissedCount(0)
    }}>Start over</Button>}
    {!lost && <Button onClick={() => {
      setStart(true)
      setPoints(0)
      setMissedCount(0)
    }}>Start</Button>}
    <Spacer />
    <Flex wrap="wrap">
    {buttons.map(i => {
      const [currentButtonColor] = React.useState<AvailableColor>(Object.values(available_colors)[i] as AvailableColor)
        return <Box margin={2} key={i}>
          <GameButton
            color={currentButtonColor}
            onClick={() => {
              setClicked(true)
              setPoints(points + 1)
            }}
            isActive={currentButtonColor == activeButton}/>
        </Box>
      }
    )}
  </Flex></VStack>
}

const App = () =>
  <ChakraProvider>
    {generateGame()}
  </ChakraProvider>

export default App;