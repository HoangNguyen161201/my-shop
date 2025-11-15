import { Text, TextProps } from "@chakra-ui/react";
import CountDownComponent from "react-countdown";

interface CountDownProps extends TextProps {
  timeExtra: number;
}

export default function CountDown({ timeExtra, ...others }: CountDownProps) {
  return (
    <CountDownComponent
      date={Date.now() + timeExtra}
      renderer={({ hours, minutes, seconds }) => {
        if (hours == 0) return null;
        const formatNumber = (num: number) => String(num).padStart(2, "0");
        return (
          <Text {...others}>
            {formatNumber(hours)}:{formatNumber(minutes)}:
            {formatNumber(seconds)}
          </Text>
        );
      }}
    />
  );
}
