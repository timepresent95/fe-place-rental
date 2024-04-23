import { CustomErrorResponse } from "./api/customResponse";

export default class CustomError extends Error {
  status: number;
  detailCode: number;
  name: string;
  constructor(response: CustomErrorResponse) {
    super(response.message);
    this.status = response.status;
    this.detailCode = response.detailCode;
    this.name = response.name;
  }
}
