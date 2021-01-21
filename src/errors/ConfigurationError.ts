export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
  }
}

export {
  ConfigurationError as default,
};
