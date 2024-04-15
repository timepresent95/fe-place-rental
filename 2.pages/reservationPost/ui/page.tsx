import dayjs from "@/6.shared/lib/dayjs";
import { FACILITY_ID_QUERY_KEY } from "../lib";

interface Props {
  searchParams?: {
    [FACILITY_ID_QUERY_KEY]: string;
  };
}

function ReservationPostPage({ searchParams }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <div className="bg-yellow-100 rounded-lg p-4 break-keep">
          <h2 className="font-bold mb-4 text-center text-xl">[ 이용 안내 ]</h2>
          <div className="space-y-2 mb-3">
            <h3 className="font-semibold">1. 대관 이용 신청 가능 기한</h3>
            <p className="text-sm">익월 1일 부터 3개월 후 말일까지</p>
          </div>
          <div className="space-y-2 mb-3">
            <h3 className="font-semibold">2. 이용 제한</h3>
            <p className="text-sm">
              다음 사항을 목적으로는 이용이 불가능 합니다.
            </p>
            <ol className="list-decimal pl-4 text-sm space-y-1">
              <li>사용허가 이외의 목적으로 사용하는 경우</li>
              <li>
                특정 정당이나 개인의 정치활동 및 홍보를 목적으로 하는 경우
              </li>
              <li>특정 종교의 포교 또는 교리 전파를 목적으로 하는 경우</li>
              <li>
                기타 도서관장이 도서관 유지 및 환경 관리에 문제가 있다고 판단한
                경우
              </li>
              <li>시설의 훼손으로 인한 피해가 심하다고 판단될 경우</li>
              <li>학술정보관 내 질서유지가 심히 어려울 경우</li>
            </ol>
          </div>
          <h3 className="font-semibold mb-2">3. 이용 방법</h3>
          <p className="text-sm">
            사용 승인 시간 엄수 및 부대 장비 사용법 숙지
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationPostPage;
