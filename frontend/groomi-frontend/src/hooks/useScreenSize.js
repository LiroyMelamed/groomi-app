import { useMediaQuery } from "react-responsive";

const MAX_SMALL_SCREEN_WIDTH = 1280;

export default function useScreenSize() {
    const isSmallScreen = useMediaQuery({ maxWidth: MAX_SMALL_SCREEN_WIDTH })

    return (isSmallScreen);
}