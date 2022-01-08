export async function WaitFor(msec: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }
  