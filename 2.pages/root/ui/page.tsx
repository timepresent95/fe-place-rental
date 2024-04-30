import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import AuthLink from "@/4.features/AuthLink/ui";
import ToastButton from "@/5.entities/ToastButton/ui";
import { Button } from "@/6.shared/ui/shardcn/ui/button";

export default function Page() {
  return (
    <div className="h-full">
      <div className="relative h-[90vh] block text-center">
        <Image
          className="z-10 absolute top-0 left-0"
          src="/images/main1.jpg"
          alt="main"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="z-20 relative top-0 left-0 text-white space-y-8 font-bold text-5xl py-32">
          <p>다양한 생각이 모이는 공간</p>
          <p>Place Rental</p>
        </div>
        <div className="z-20 absolute left-1/2 bottom-14 text-white w-11 h-11">
          <ChevronDown size={44} />
        </div>
      </div>
      <div className="bg-indigo-50 py-12 text-center">
        <h2 className="font-bold text-4xl text-indigo-600 mb-4">완전 무료!</h2>
        <p className="font-semibold text-lg">
          이제 장소를 무료로 대여할 수 있습니다.
        </p>
        <p className="font-semibold text-lg">
          당신의 공간을 공유하거나 다양한 활동에 참여해보세요.
        </p>
      </div>
      <div className="flex gap-12 container py-12 justify-between">
        <div>
          <span className="text-indigo-600 font-bold">point 1</span>
          <h2 className="font-bold text-2xl my-4">
            매일 열리는 특별한 행사 참여
          </h2>
          <p className="font-medium">
            특별한 장소에서 진행되는 다채로운 행사들을 찾아보고 참여하세요.
          </p>
          <div className="mt-12">
            <AuthLink
              href="/gathering/list"
              title="해당 페이지는 로그인 이후 사용 가능합니다.">
              <Button
                variant="outline"
                className="font-semibold rounded-3xl"
                size="lg">
                행사 참여하러 가기
              </Button>
            </AuthLink>
          </div>
        </div>
        <Image
          src="/images/main4.jpg"
          alt="main2"
          width={500}
          height={320}
          className="rounded-xl object-cover"
          style={{ aspectRatio: "25/16" }}
          priority
        />
      </div>
      <div className="flex gap-12 container py-12 justify-between">
        <Image
          src="/images/main3.jpg"
          alt="main3"
          width={500}
          height={320}
          className="rounded-xl object-cover"
          style={{ aspectRatio: "25/16" }}
          priority
        />
        <div className="flex-1">
          <span className="text-indigo-600 font-bold">point 2</span>
          <h2 className="font-bold text-2xl my-4">다양한 장소를 한 곳에서</h2>
          <p className="font-medium">
            등록되어 있는 다양한 장소를 한 곳에서 만나보세요.
          </p>
          <p className="font-medium">그리고 손쉽게 대여하세요.</p>
          <div className="mt-12">
            <Link href="/rental/apply">
              <Button
                variant="outline"
                className="font-semibold rounded-3xl"
                size="lg">
                장소 대여하러 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-12 container py-12 justify-between">
        <div>
          <span className="text-indigo-600 font-bold">point 3</span>
          <h2 className="font-bold text-2xl my-4">
            여러분의 공간을 활용해보세요
          </h2>
          <p className="font-medium">사용하지 않는 공간을 함께 활용하거나</p>
          <p className="font-medium">
            다른 사람들과 만나고 싶은 곳을 원하는 시간에만 임대하세요.
          </p>
          <div className="mt-12">
            <ToastButton
              message="해당 서비스는 아직 지원하지 않습니다."
              variant="outline"
              className="font-semibold rounded-3xl"
              size="lg">
              나의 공간 공유하기
            </ToastButton>
          </div>
        </div>
        <Image
          src="/images/main2.jpg"
          alt="main2"
          width={500}
          height={320}
          className="rounded-xl object-cover"
          style={{ aspectRatio: "25/16" }}
          priority
        />
      </div>
      <div>
        <h2></h2>
        <p></p>
      </div>
    </div>
  );
}
