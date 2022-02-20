import * as React from 'react';
import {Box, ChakraProvider, Flex } from "@chakra-ui/react";

const available_colors = {
  red: "red", green: "green", blue: "blue", orange: "orange",
}

type AvailableColor = keyof typeof available_colors;

interface ButtonProps {
  color: AvailableColor
  onClick: () => void
  isActive: boolean
  key: number
}

const Button: React.FC<ButtonProps> = ({color, onClick, isActive, key}) => {
  return <Box key={`${key}-button`} {...{onClick}}>
    <svg width="200px" height="200px">
      <circle id="what" cx="100" cy="100" r="100" fill={isActive ? "gray" : color}/>
    </svg>
  </Box>
}

const getRandomMember = (arraySource: any[]) => arraySource[Math.floor(Math.random() * arraySource.length)]

const generateGame = (amountOfButtons = 4, startLevel = 1) => {
  const [activeButton, setActiveButton] = React.useState<AvailableColor>()
  const [buttons] = React.useState(Array.from(Array(amountOfButtons).keys()))
  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextActiveButton = Object.values(available_colors)[getRandomMember(buttons)] as AvailableColor
      setActiveButton(nextActiveButton)
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <Flex>
    {buttons.map(i => {
      const [currentButtonColor] = React.useState<AvailableColor>(Object.values(available_colors)[i] as AvailableColor)
        return <Box>
          <Button
            key={i}
            color={currentButtonColor}
            onClick={() => alert("hei")}
            isActive={currentButtonColor == activeButton}/>
        </Box>
      }
    )}
  </Flex>
}

const App = () =>
  <ChakraProvider>
    {generateGame()}
  </ChakraProvider>

export default App;