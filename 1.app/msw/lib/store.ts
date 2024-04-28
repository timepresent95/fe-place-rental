import { faker } from "@faker-js/faker";

import { Rental } from "@/5.entities/rental/model";
import { User } from "@/5.entities/User/model";

import { createMockReservation, createMockUserInfo } from "./faker";

export default class CustomStore {
  private static instance: CustomStore;
  data: {
    user: User[];
    rental: { id: string; list: Rental[]; total: number };
  };

  private constructor() {
    const initRentalListLength = faker.number.int({ min: 11, max: 49 });
    this.data = {
      user: [
        createMockUserInfo({
          id: "test",
          password: "Test1234!",
          firstName: "테스트01",
          familyName: "김",
          email: "test1@fakemail.com",
          phone: "010-1234-5678",
        }),
        createMockUserInfo({
          id: "t",
          password: "t",
          firstName: "테스트02",
          familyName: "이",
          email: "test2@fakemail.com",
          phone: "010-5678-1234",
        }),
        {
          ...createMockUserInfo({
            id: "admin",
            password: "admin",
            firstName: "관리자",
            familyName: "김",
            email: "admin@fakemail.com",
            phone: "010-0000-0000",
          }),
          authority: "admin",
        },
      ],
      rental: {
        id: faker.string.uuid(),
        list: Array.from({ length: initRentalListLength }).map(() =>
          createMockReservation()
        ),
        total: initRentalListLength,
      },
    };
  }

  static getInstance(): CustomStore {
    if (this.instance === undefined) {
      this.instance = new CustomStore();
    }
    return this.instance;
  }
}
