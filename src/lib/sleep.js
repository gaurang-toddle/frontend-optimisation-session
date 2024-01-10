const defaultDuration = 500;

export const block = (duration = defaultDuration) => {
  const start = performance.now();
  while (performance.now() < start + duration) {}
};