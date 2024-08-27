class GlobalAbortController {
  private controller: AbortController;

  constructor() {
    this.controller = new AbortController();
  }

  getSignal() {
    return this.controller.signal;
  }

  abortRequests() {
    this.controller.abort();
    this.controller = new AbortController(); // Reset the controller
  }
}

const globalAbortController = new GlobalAbortController();
export default globalAbortController;
