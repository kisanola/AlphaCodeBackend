declare global {
  interface ControllerInterface {
    (req: any, res: any): Promise<any>;
  }
}

export {};
