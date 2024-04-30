import { faker } from "@faker-js/faker";

import { GatheringDetail } from "@/4.features/Gathering/model";
import { Rental } from "@/5.entities/Rental/model";
import { User } from "@/5.entities/User/model";

import { createMockReservation, createMockUserInfo } from "./faker";

export default class CustomStore {
  private static instance: CustomStore;
  data: {
    user: User[];
    rental: { id: string; list: Rental[]; total: number };
    gathering: { id: string; list: GatheringDetail[]; total: number };
  };

  private constructor() {
    const initRentalListLength = faker.number.int({ min: 11, max: 49 });
    const placeId = faker.string.uuid();
    const rentalList = Array.from({ length: initRentalListLength }).map(() =>
      createMockReservation()
    );
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
        id: placeId,
        list: rentalList,
        total: rentalList.length,
      },
      gathering: {
        id: placeId,
        list: rentalList
          .filter((v) => v.applicationState === "approved")
          .map((v) => ({ ...v, attendees: [], applicants: [] })),
        total: rentalList.length,
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
