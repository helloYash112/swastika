const now = new Date();
const year = now.getFullYear();



const currentMonth= ()=>{
const startDate = formatLocalDate(
  new Date(year, now.getMonth(), 2)
);

const endDate = formatLocalDate(
  new Date(year, now.getMonth() + 1, 2)
);
return {startDate,endDate};
}

// helper to format as YYYY-MM-DD (like LocalDate)
const formatLocalDate = (date) => {
  return date.toISOString().split("T")[0];
};

const months = Array.from({ length: 12 }, (_, i) => {
  const startDate = new Date(year, i, 2);
  const endDate = new Date(year, i + 1, 2);

  return {
    startDate: formatLocalDate(startDate),
    endDate: formatLocalDate(endDate)
  };
});

export  {months,currentMonth};