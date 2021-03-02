interface WindowDimentions {
  width: number;
  height: number;
}

export function getWindowDimensions(): WindowDimentions {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}
