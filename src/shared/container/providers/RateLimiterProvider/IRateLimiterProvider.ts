interface IRateLimiterProvider {
  consume(key: string): Promise<void>;
}

export { IRateLimiterProvider };
