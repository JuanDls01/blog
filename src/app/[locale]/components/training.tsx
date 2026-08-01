import { getTranslations } from "next-intl/server";
import { WEEKS, type TrainingData } from "@/lib/intervals";

const GOAL_KM = 21.0975;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

export async function Training({
  data,
  locale,
}: {
  data: TrainingData;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "home.beyond" });
  const km = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const monthName = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: "UTC",
  });
  const dayMonth = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  const progress = Math.min(data.longestRunKm / GOAL_KM, 1);
  const ticks = [5, 10, 15].map((atKm) => (atKm / GOAL_KM) * 100);

  const firstWeekMs = Date.parse(data.firstWeekStart);
  const maxWeekKm = Math.max(...data.weeklyKm);
  const quarters = [0, 13, 26, 39].map((week) => ({
    week,
    label: monthName.format(new Date(firstWeekMs + week * WEEK_MS)),
  }));

  const weekTitle = (week: number, weekKm: number) => {
    const start = new Date(firstWeekMs + week * WEEK_MS);
    const end = new Date(start.getTime() + 6 * DAY_MS);
    return `${dayMonth.format(start)} — ${dayMonth.format(end)} · ${km.format(weekKm)} km`;
  };

  return (
    <div>
      <div aria-hidden>
        <div className="relative h-5 text-[10px] text-faint tabular-nums">
          <span className="absolute left-0 bottom-1">0</span>
          {ticks.map((left, i) => (
            <span
              key={left}
              className="absolute bottom-1 -translate-x-1/2"
              style={{ left: `${left}%` }}
            >
              {(i + 1) * 5}K
            </span>
          ))}
          <span className="absolute right-0 bottom-1">{km.format(21.1)}K</span>
        </div>

        <div className="relative h-2.5">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-faint/50" />
          {ticks.map((left) => (
            <span
              key={left}
              className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-line"
              style={{ left: `${left}%` }}
            />
          ))}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-accent"
            style={{ width: `${progress * 100}%` }}
          />
          <span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-accent/20"
            style={{ left: `${progress * 100}%` }}
          />
          <span
            className="ripple absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-accent/25"
            style={{ left: `${progress * 100}%` }}
          />
          <span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-accent"
            style={{ left: `${progress * 100}%` }}
          />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3 rounded-full bg-fg/60" />
        </div>
      </div>

      <p className="mt-2.5 text-[13px] text-faint tabular-nums">
        {t("longestRun", {
          km: km.format(data.longestRunKm),
          pct: Math.round(progress * 100),
        })}
      </p>

      <div className="mt-7">
        <div className="flex items-end gap-[2px] h-9">
          {data.weeklyKm.map((weekKm, week) => (
            <div
              key={week}
              data-tip={weekTitle(week, weekKm)}
              className="tip group flex-1 flex items-end h-full"
            >
              <div
                className={`w-full rounded-[2px] min-h-[2px] transition-colors duration-150 ${
                  weekKm === 0
                    ? "bg-line"
                    : week === WEEKS - 1
                      ? "bg-accent"
                      : "bg-fg/20 group-hover:bg-fg/50"
                }`}
                style={{
                  height: `${maxWeekKm > 0 ? Math.max((weekKm / maxWeekKm) * 100, weekKm > 0 ? 8 : 0) : 0}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="relative h-4 mt-1.5 text-[10px] text-faint">
          {quarters.map(({ week, label }) => (
            <span
              key={week}
              className="absolute top-0"
              style={{ left: `${(week / WEEKS) * 100}%` }}
            >
              {label}
            </span>
          ))}
          <span className="absolute right-0 top-0">{t("perWeek")}</span>
        </div>
      </div>
    </div>
  );
}
