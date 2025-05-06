import { container } from "tsyringe";

import { RateLimiterMemoryProvider } from "./implementations/RateLimiterMemoryProvider";
import { IRateLimiterProvider } from "./IRateLimiterProvider";

container.registerSingleton<IRateLimiterProvider>(
  "RateLimiterProvider",
  RateLimiterMemoryProvider
);
