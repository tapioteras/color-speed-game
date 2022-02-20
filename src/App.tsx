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

const Button: React.FC<ButtonProps> = ({color, onClick, isActive, key}) =>
  <Box key={`${key}-button`} {...{onClick}}>
    <svg width="200px" height="200px">
      <circle id="what" cx="100" cy="100" r="100" fill={color} />
    </svg>
  </Box>

const getRandomMember = (arraySource: String[]): String => arraySource[Math.floor(Math.random() * arraySource.length)]

const generateGame = (amountOfButtons = 4, startLevel = 1) => {
  return <Flex>
    {Array.from(Array(amountOfButtons).keys()).map(i =>
      <Box>
      <Button
        key={i}
        color={Object.values(available_colors)[i] as AvailableColor}
        onClick={() => alert("hei")}
        isActive={true} />
      </Box>
    )}
  </Flex>
}

const App = () =>
  <ChakraProvider>
    {generateGame()}
  </ChakraProvider>

export default App;