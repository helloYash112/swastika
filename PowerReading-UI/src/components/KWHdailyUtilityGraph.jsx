import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function KWHdailyUtilityGraph() {
  const user = useSelector((state) => state.user?.user);

  const meters =
    user?.meters?.filter((meter) => meter?.readings?.length > 0) || [];

  const formattedMeters = meters.map((meter) => {
    const readings = meter.readings
      .map((reading) => ({
        ...reading,
        sortDate: new Date(`${reading.date}T${reading.time}`).getTime(),
        graphDate: reading.date
      }))
      .sort((a, b) => a.sortDate - b.sortDate);

    // Calculate usage (difference between current and previous KWH)
    const readingsWithUsage = readings.map((reading, index, arr) => ({
      ...reading,
      usage: index === 0 ? 0 : reading.kwh - arr[index - 1].kwh
    }));

    return {
      ...meter,
      readings: readingsWithUsage
    };
  });

  return (
    <>
      {formattedMeters.map((meter, idx) => {
        const kwhTicks = [...new Set(meter.readings.map((r) => r.kwh))];
        const usageValues = meter.readings.map((r) => r.usage);

        const maxUsage = Math.max(...usageValues);
        const minUsage = Math.min(...usageValues.filter((u) => u > 0));

        return (
          <div key={idx} className="meter-chart" >
            <h3>{meter.name}</h3>
           <div 
           style={{ width: "100%", height: 750 , minWidth: 0,
                   minHeight: 0,}}>
            <ResponsiveContainer width="100%" height={750}>
              <LineChart
                data={meter.readings}
                margin={{
                  top: 20,
                  right: 40,
                  left: 40,
                  bottom: 80
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis = Date */}
                <XAxis
                  dataKey="graphDate"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />

                {/* Left Y-axis = KWH */}
                <YAxis
                  yAxisId="left"
                  ticks={kwhTicks}
                  interval={0}
                  domain={[
                    Math.min(...kwhTicks),
                    Math.max(...kwhTicks)
                  ]}
                  allowDecimals={false}
                  width={80}
                />

                {/* Right Y-axis = Usage */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  allowDecimals={false}
                />

                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name === "kwh" ? "KWH" : "Usage"
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />

                <Legend />

                {/* KWH line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="kwh"
                  name="KWH"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                {/* Usage line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="usage"
                  name="Usage"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={({ payload, cx, cy }) => {
                    if (payload.usage === maxUsage) {
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={8}
                          fill="red"
                        />
                      );
                    }

                    if (payload.usage === minUsage) {
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={8}
                          fill="blue"
                        />
                      );
                    }

                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="#8884d8"
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </>
  );
}