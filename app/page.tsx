"use client";

import { useEffect, useState } from "react";

type Course = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  source: "us" | "wz";
  color: string;
  instructor: string;
  room: string;
  credits: string;
  dates?: string;
  meetings: { day: number; start: string; end: string }[];
};

const courses: Course[] = [
  {
    id: "math2400",
    code: "MATH 2400 · W14",
    name: "Calc for Business and Economics",
    shortName: "商业与经济微积分",
    source: "us",
    color: "mint",
    instructor: "Jiayou Chao",
    room: "截图未显示",
    credits: "3 Credits",
    dates: "2026.08.31 — 2026.12.17",
    meetings: [
      { day: 1, start: "08:30", end: "09:45" },
      { day: 3, start: "08:30", end: "09:45" },
    ],
  },
  {
    id: "eng1300",
    code: "ENG 1300 · W54",
    name: "College Composition",
    shortName: "大学英语写作",
    source: "us",
    color: "blue",
    instructor: "截图未显示",
    room: "截图未显示",
    credits: "截图未显示",
    dates: "2026.08.31 — 2026.12.17",
    meetings: [
      { day: 1, start: "11:30", end: "14:00" },
      { day: 4, start: "11:30", end: "14:00" },
    ],
  },
  {
    id: "ge1000",
    code: "GE 1000 · W41",
    name: "Transition to Kean",
    shortName: "大学学习导论",
    source: "us",
    color: "violet",
    instructor: "Matthew Campbell",
    room: "截图未显示",
    credits: "1 Credit",
    dates: "2026.08.31 — 2026.12.17",
    meetings: [{ day: 0, start: "14:30", end: "15:45" }],
  },
  {
    id: "esl0303",
    code: "ESL 0303 · W30",
    name: "ESL 0303",
    shortName: "学术英语",
    source: "us",
    color: "coral",
    instructor: "截图未显示",
    room: "截图未显示",
    credits: "截图未显示",
    dates: "2026.08.31 — 2026.12.17",
    meetings: [
      { day: 0, start: "16:00", end: "17:00" },
      { day: 3, start: "16:00", end: "17:00" },
    ],
  },
  {
    id: "esl0305",
    code: "ESL 0305 · W59",
    name: "ESL 0305",
    shortName: "学术英语",
    source: "us",
    color: "amber",
    instructor: "截图未显示",
    room: "截图未显示",
    credits: "截图未显示",
    dates: "2026.08.31 — 2026.12.17",
    meetings: [
      { day: 1, start: "17:30", end: "18:30" },
      { day: 4, start: "17:30", end: "18:30" },
    ],
  },
  {
    id: "af2005",
    code: "AF 2005 · W04",
    name: "Art Courses (Lecture)",
    shortName: "艺术课程",
    source: "wz",
    color: "rose",
    instructor: "Staff（待定）",
    room: "SLAC 213",
    credits: "1 Unit",
    meetings: [{ day: 0, start: "10:00", end: "11:15" }],
  },
  {
    id: "cncc2403",
    code: "CNCC 2403 · W05",
    name: "Approaching History (Lecture)",
    shortName: "走近历史",
    source: "wz",
    color: "cyan",
    instructor: "杨老师",
    room: "CBPM C119",
    credits: "3 Units",
    meetings: [{ day: 3, start: "10:00", end: "11:30" }],
  },
  {
    id: "pe2005",
    code: "PE 2005 · W19",
    name: "Physical Education (Lecture)",
    shortName: "体育",
    source: "wz",
    color: "lime",
    instructor: "陈老师",
    room: "AC 2F Basketball Court",
    credits: "1 Unit",
    meetings: [{ day: 3, start: "13:00", end: "14:30" }],
  },
];

const days = ["周一", "周二", "周三", "周四", "周五"];
const START = 8 * 60;
const END = 20 * 60;
const HOUR_HEIGHT = 72;
const toMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export default function Home() {
  const [selected, setSelected] = useState<Course | null>(null);
  const [filter, setFilter] = useState<"all" | "us" | "wz">("all");
  const visible = courses.filter((course) => filter === "all" || course.source === filter);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">秋</span>
          <div><b>MY WEEK</b><span>2026 秋季课表</span></div>
        </div>
        <div className="semester"><span className="status-dot" />Fall 2026 · 已注册</div>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow">WENZHOU–KEAN UNIVERSITY</p>
          <h1>一周的节奏，<br /><em>一眼看清。</em></h1>
          <p className="lede">课程块高度对应真实时长。点击任意课程，查看教授、地点与完整时间。</p>
        </div>
        <div className="summary" aria-label="课表摘要">
          <div><strong>8</strong><span>门课程</span></div>
          <div><strong>13</strong><span>每周课次</span></div>
          <div><strong>16</strong><span>已注册学分*</span></div>
        </div>
      </section>

      <section className="schedule-shell">
        <div className="toolbar">
          <div className="tabs" role="group" aria-label="筛选课程">
            {([['all', '全部课程'], ['us', '美方课表'], ['wz', '温州课表']] as const).map(([value, label]) => (
              <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
          <div className="hint"><span>↗</span> 点击课程查看详情</div>
        </div>

        <div className="calendar-wrap">
          <div className="calendar" style={{ "--calendar-height": `${((END - START) / 60) * HOUR_HEIGHT}px` } as React.CSSProperties}>
            <div className="corner">GMT+8</div>
            {days.map((day, index) => <div className="day-head" key={day}><span>0{index + 1}</span>{day}</div>)}
            <div className="time-axis">
              {Array.from({ length: 13 }, (_, i) => (
                <div key={i} style={{ top: `${i * HOUR_HEIGHT}px` }}>{String(i + 8).padStart(2, "0")}:00</div>
              ))}
            </div>
            {days.map((day, dayIndex) => (
              <div className="day-column" key={day} aria-label={day}>
                {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ top: `${i * HOUR_HEIGHT}px` }} />)}
                {visible.flatMap((course) => course.meetings
                  .filter((meeting) => meeting.day === dayIndex)
                  .map((meeting) => {
                    const top = ((toMinutes(meeting.start) - START) / 60) * HOUR_HEIGHT;
                    const height = ((toMinutes(meeting.end) - toMinutes(meeting.start)) / 60) * HOUR_HEIGHT;
                    return (
                      <button
                        key={`${course.id}-${meeting.day}`}
                        className={`course ${course.color}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        onClick={() => setSelected(course)}
                        aria-label={`${course.name}，${meeting.start}到${meeting.end}，点击查看详情`}
                      >
                        <span className="course-time">{meeting.start} — {meeting.end}</span>
                        <strong>{course.shortName}</strong>
                        <small>{course.code}</small>
                      </button>
                    );
                  }))}
              </div>
            ))}
          </div>
        </div>
        <p className="footnote">* 16 Credits 来自美方课表截图；中方课程以 Unit 显示。美方截图未展开的教授与地点已标为“截图未显示”。</p>
      </section>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}>
          <section className={`detail-card detail-${selected.color}`} role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="close" onClick={() => setSelected(null)} aria-label="关闭课程详情">×</button>
            <div className="detail-source">{selected.source === "us" ? "美方课程" : "温州课程"}</div>
            <p className="detail-code">{selected.code}</p>
            <h2 id="detail-title">{selected.shortName}</h2>
            <p className="detail-en">{selected.name}</p>
            <div className="detail-grid">
              <div><span>教授</span><strong>{selected.instructor}</strong></div>
              <div><span>地点</span><strong>{selected.room}</strong></div>
              <div><span>时间</span><strong>{selected.meetings.map(m => `${days[m.day]} ${m.start}–${m.end}`).join(" · ")}</strong></div>
              <div><span>学分</span><strong>{selected.credits}</strong></div>
            </div>
            {selected.dates && <p className="date-row"><span>教学周期</span>{selected.dates}</p>}
          </section>
        </div>
      )}
    </main>
  );
}
