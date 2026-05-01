import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend ,Tooltip} from "recharts";

export default function BillGraph() {
  const unit_charge = 5.85;
  const user = useSelector((state) => state.user?.user);
  const meters =
    user?.meters?.filter((meter) => meter?.readings?.length > 0) || [];
  //getting readings that only contains meter_name,array of reading with date,net_kwh ,and amount
const readings = meters?.map((meter) => {
  const sortedReadings = meter.readings
    .map((reading) => ({
      ...reading,
      sortDate: new Date(`${reading.date}T${reading.time}`).getTime(),
      graphDate: `${reading.date} ${reading.time}`,
    }))
    .sort((a, b) => a.sortDate - b.sortDate);

  // Calculate usage and amount
  const readingsWithUsage = sortedReadings.map((reading, index, arr) => {
    const usage = index === 0 ? 0 : reading.kwh - arr[index - 1].kwh;

    return {
      ...reading,
      usage,
      amount: Math.floor(usage * unit_charge),
    };
  });
 
  return {
    meter_name: meter.name,
    readingsWithUsage,
  };
});


return (
  <>
    {readings?.map((meter, idx) => (
      <div key={idx} style={{ width: "100%", height: "400px" }}>
        <LineChart
          width={800}
          height={400}
          data={meter.readingsWithUsage}
        >
          <CartesianGrid strokeDasharray="5 5" />

          <XAxis dataKey="graphDate" />
          <Tooltip></Tooltip>
          <YAxis />
          <Legend></Legend>

          <Line type="monotone" dataKey="usage" />

          <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Total Amount" />
        </LineChart>
      </div>
    ))}
  </>
)
};