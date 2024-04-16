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
  });

  return (
    <form className="px-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="useDate"
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.useDate}</FormLabel>
                <FormControl>
                  <DatePicker />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.applicantName}</FormLabel>
                <FormControl>
                  <Input />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.contactEmail}</FormLabel>
                <FormControl>
                  <Input />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.contactPhone}</FormLabel>
                <FormControl>
                  <Input />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.purpose}</FormLabel>
                <FormControl>
                  <Textarea />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.expectedParticipants}</FormLabel>
                <FormControl>
                  <Input />
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
          render={() => {
            return (
              <FormItem>
                <FormLabel>{FORM_LABEL.isPublic}</FormLabel>
                <FormControl>
                  <div>
                    <Button type="button">비공개</Button>
                    <Button type="button">공개</Button>
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </Form>
    </form>
  );
}

ReservationFormField.displayName = "ReservationFormField";

export default ReservationFormField;
