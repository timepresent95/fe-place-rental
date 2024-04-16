"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PostReservationRequestBody } from "@/5.entities/reservation/model";
import { postReservationBodyValidation } from "@/5.entities/reservation/lib";
import DatePicker from "@/6.shared/ui/shardcn/components/DatePicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/6.shared/ui/shardcn/ui/form";
import { Input } from "@/6.shared/ui/shardcn/ui/input";
import { Textarea } from "@/6.shared/ui/shardcn/ui/textarea";
import { Button } from "@/6.shared/ui/shardcn/ui/button";
import NumberStepper from "@/6.shared/ui/NumberStepper/ui";

const FORM_LABEL: {
  [key in keyof PostReservationRequestBody]: {
    label: string;
    placeholder?: string;
  };
} = {
  applicantName: {
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

function ReservationFormField() {
  const form = useForm<PostReservationRequestBody>({
    resolver: zodResolver(postReservationBodyValidation),
    defaultValues: {
      applicantName: "",
      contactEmail: "",
      contactPhone: "",
      purpose: "",
      expectedParticipants: 3,
      useDate: undefined,
      isPublic: true,
    },
  });

  return (
    <Form {...form}>
      <form
        className="px-4 space-y-1"
        onSubmit={form.handleSubmit((data) => console.log(data))}>
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
          name="applicantName"
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

ReservationFormField.displayName = "ReservationFormField";

export default ReservationFormField;
