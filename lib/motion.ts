/** Timing copied from Agentura Framer appear JSON. */

export const easeFramer: [number, number, number, number] = [0.44, 0, 0.56, 1];

export const kenBurnsInitial = { opacity: 0, scale: 1.5 };
export const kenBurnsAnimate = { opacity: 1, scale: 1 };
export const kenBurnsTransition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 0.9,
};

export const kenBurnsTextTransition = {
  type: "spring" as const,
  bounce: 0.1,
  duration: 1,
  delay: 0.8,
};

export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.4,
    ease: easeFramer,
  },
});

export const inView = {
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: "-12% 0px" as const },
  transition: {
    duration: 0.55,
    ease: easeFramer,
  },
};
