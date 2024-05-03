"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { DefaultValues, useForm } from "react-hook-form";

import { postReservation } from "@/5.entities/Rental/api";
import { applyRentalBodyValidation } from "@/5.entities/Rental/lib";
import { ApplyRentalRequestBody } from "@/5.entities/Rental/model";
import { useUserContext } from "@/5.entities/User/lib/context";
import NumberStepper from "@/6.shared/ui/NumberStepper/ui";
import DatePicker from "@/6.shared/ui/shardcn/components/DatePicker";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

const FORM_LABEL: {
  [key in keyof ApplyRentalRequestBody]: {
    label: string;
    placeholder?: string;
  };
} = {
  hostName: {
    label: "신청자 이름",
    placeholder: "단체인 경우 단체명",
  },
  contactEmail: {
    label: "연락처 (이메일)",
    placeholder: "place@rental.com",
  },
  contactPhone: {
    label: "연락처 (전화)",
    placeholder: "010-1234-5678",
  },
  purpose: { label: "사용 목적", placeholder: "최소 20자 이상 작성해주세요" },
  expectedParticipants: { label: "참석 예상 인원" },
  useDate: { label: "사용 예정일" },
  isPublic: { label: "공개 여부" },
};

//TODO: 예약 가능 날짜와 관련된 로직 추가해야 함
// 이미 예약이 완료된 날, 지나간 날은 예약이 불가능

function RentalFormField() {
  const router = useRouter();
  const auth = useUserContext();
  const form = useForm<ApplyRentalRequestBody>({
    resolver: zodResolver(applyRentalBodyValidation),
    defaultValues: {
      hostName: "",
      contactEmail: "",
      contactPhone: "",
      purpose: "",
      expectedParticipants: 3,
      useDate: undefined,
      isPublic: true,
    },
  });

  useEffect(() => {
    if (auth.uid) {
      form.setValue("hostName", auth.familyName! + auth.firstName!);
      form.setValue("contactEmail", auth.email!);
      form.setValue("contactPhone", auth.phone!);
    }
  }, [auth, form]);

  return (
    <Form {...form}>
      <form
        className="px-4 space-y-1"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            //TODO: 해당 요청을 진행중인 경우를 처리하기 위해 useForm, useTransition 등의 로직을 사용해야함 (진행중 표시 필요)
            await postReservation(data);
            router.push("/rental/success");
          } catch (err) {
            //XXX: 여기로 들어오면 안됨
            console.error(err);
          }
        })}>
        <FormField
          control={form.control}
          name="useDate"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(day) => day && form.setValue(field.name, day)}
                    placeholder="예약일을 선택해주세요"
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    <Button
                      className="w-full"
                      variant={field.value ? "outline" : "default"}
                      onClick={() => form.setValue(field.name, false)}
                      type="button">
                      비공개
                    </Button>
                    <Button
                      className="w-full"
                      variant={field.value ? "default" : "outline"}
                      onClick={() => form.setValue(field.name, true)}
                      type="button">
                      공개
                    </Button>
                  </div>
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="hostName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={FORM_LABEL[field.name].placeholder}
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={FORM_LABEL[field.name].placeholder}
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={FORM_LABEL[field.name].placeholder}
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="expectedParticipants"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <NumberStepper
                    min={3}
                    max={50}
                    initValue={form.getValues(field.name)}
                    onChange={(v) => {
                      form.setValue(field.name, v);
                    }}
                    className="h-8"
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL[field.name].label}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-32"
                    {...field}
                    placeholder={FORM_LABEL[field.name].placeholder}
                  />
                </FormControl>
                <FormMessage errorDisplayMode="transparent" />
              </FormItem>
            );
          }}
        />
        <Button className="mt-8 min-w-36 ml-auto block" type="submit">
          신청
        </Button>
      </form>
    </Form>
  );
}

RentalFormField.displayName = "ReservationFormField";

export default RentalFormField;
