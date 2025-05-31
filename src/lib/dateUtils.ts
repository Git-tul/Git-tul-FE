/**
 * 날짜를 상대적 시간 또는 절대 시간으로 포맷팅하는 함수
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (몇 분 전, 몇 시간 전, 몇 일 전, 또는 년월일)
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // 날짜가 유효하지 않은 경우
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);

  // 1분 미만
  if (diffMin < 1) {
    return "방금 전";
  }
  // 1시간 미만
  else if (diffHour < 1) {
    return `${diffMin}분 전`;
  }
  // 24시간 미만
  else if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }
  // 30일 미만
  else if (diffDay < 30) {
    return `${diffDay}일 전`;
  }
  // 30일 이상
  else {
    return formatDate(date);
  }
}

/**
 * 절대 날짜를 년월일 형식으로 포맷팅
 * @param date - Date 객체
 * @returns 'YYYY년 MM월 DD일' 형식의 문자열
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
