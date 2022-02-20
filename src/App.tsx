import * as React from 'react';
import {Box, ChakraProvider, Flex, Heading, VStack} from "@chakra-ui/react";

const available_colors = {
  red: "cyan", green: "green", blue: "blue", orange: "orange",
}

type AvailableColor = keyof typeof available_colors;

interface ButtonProps {
  color: AvailableColor
  onClick: () => void
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({color, onClick, isActive}) => {
  return <Box key={`${color}-button`} {...{onClick}}>
    <svg width="200px" height="200px">
      <circle id="what" cx="100" cy="100" r="100" fill={isActive ? `light${color}` : color}/>
    </svg>
  </Box>
}

const getRandomMember = (arraySource: any[]) => arraySource[Math.floor(Math.random() * arraySource.length)]

const generateGame = (amountOfButtons = 4, startLevel = 1) => {
  const [activeButton, setActiveButton] = React.useState<AvailableColor>()
  const [buttons] = React.useState(Array.from(Array(amountOfButtons).keys()))
  const [points, setPoints] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextActiveButton = Object.values(available_colors)[getRandomMember(buttons)] as AvailableColor
      setActiveButton(nextActiveButton)
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <VStack>
    <Heading>{`Points: ${points}`}</Heading>
    <Flex>
    {buttons.map(i => {
      const [currentButtonColor] = React.useState<AvailableColor>(Object.values(available_colors)[i] as AvailableColor)
        return <Box key={i}>
          <Button
            color={currentButtonColor}
            onClick={() => {
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