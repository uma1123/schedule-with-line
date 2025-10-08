"use client";
import { CATEGORY_COLORS, Schedule } from "@/types/schedule";
import { mockSchedules } from "@/utils/data";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules] = useState<Schedule[]>(mockSchedules);

  // 日付を取得
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 前の月へ移動
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 次の月へ移動
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // 指定した日の予定を取得
  const getSchedulesForDate = (date: number) => {
    const targetDate = new Date(year, month, date);
    return schedules.filter((s) => {
      const scheduleDate = new Date(s.startTime);
      return scheduleDate.toDateString() === targetDate.toDateString();
    });
  };

  // カレンダーの日付を作成
  const calendarDays = [];

  // 空白の日付を追加
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // 実際の日付を追加
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      {/*ヘッダー*/}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          ⇦ 前の月へ
        </button>
        <h1 className="text-2xl font-bold">
          {year}年 {month + 1}月
        </h1>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          次の月へ ➡
        </button>
      </div>

      {/*カレンダー本体*/}
      <div className="rounded-lg shadow-lg overflow-hidden">
        {/*曜日*/}
        <div className="grid grid-cols-7 bg-gray-50">
          {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => (
            <div
              key={index}
              className={`p-3 text-center font-semibold ${
                index === 0
                  ? "text-red-500"
                  : index === 6
                  ? "text-blue-500"
                  : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/*日付*/}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={index}
                  className="h-24 border-r border-b border-gray-200"
                ></div>
              );
            }

            const daySchedules = getSchedulesForDate(day);
            const isToday =
              new Date().toDateString() ===
              new Date(year, month, day).toDateString();

            return (
              <div
                key={index}
                className={`h-24 border-r border-b border-gray-200 p-1 ${
                  isToday ? "bg-yellow-50" : ""
                }`}
              >
                <div
                  className={`font-semibold text-sm mb-1 ${
                    isToday ? "text-yellow-600" : "text-gray-800"
                  }`}
                >
                  {day}
                </div>

                {/*予定表示*/}
                <div className="space-y-1">
                  {daySchedules.slice(0, 2).map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`text-xs px-1 py-0.5 rounded truncate border ${
                        CATEGORY_COLORS[schedule.category]
                      }`}
                      title={`${schedule.title} - ${new Date(
                        schedule.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    >
                      {new Date(schedule.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      {schedule.title}
                    </div>
                  ))}

                  {daySchedules.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{daySchedules.length - 2} 件の予定
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
