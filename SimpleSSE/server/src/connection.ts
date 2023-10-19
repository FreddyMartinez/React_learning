import { Response } from "express"

export class Connection {
  response: Response
  constructor(res: Response) {
    this.response = res
  }

  /** Sends data through the open chanel */
  write(msg: string) {
    this.response.write(`data: ${msg} \n\n`);
  }

  close() {
    this.response.end()
  }
}