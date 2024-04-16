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

const FORM_LABEL: { [key in keyof PostReservationRequestBody]: string } = {
  applicantName: "신청인 이름",
  contactEmail: "연락처 (이메일)",
  contactPhone: "연락처 (핸드폰)",
  purpose: "사용 목적",
  expectedParticipants: "참석 예상 인원",
  useDate: "사용 예정일",
  isPublic: "공개 여부",
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
        className="px-4"
        onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField
          control={form.control}
          name="useDate"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.useDate}</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(day) => day && form.setValue(field.name, day)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.isPublic}</FormLabel>
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
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.applicantName}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.contactEmail}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.contactPhone}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.purpose}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
                <FormLabel>{FORM_LABEL.expectedParticipants}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      form.setValue(
                        field.name,
                        parseInt(e.currentTarget.value)
                      );
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
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
