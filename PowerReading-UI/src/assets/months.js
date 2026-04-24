const now = new Date();
const year = now.getFullYear();

// helper to format as YYYY-MM-DD (like LocalDate)
const formatLocalDate = (date) => {
  return date.toISOString().split("T")[0];
};

const months = Array.from({ length: 12 }, (_, i) => {
  const startDate = new Date(year, i, 1);
  const endDate = new Date(year, i + 1, 1);

  return {
    startDate: formatLocalDate(startDate),
    endDate: formatLocalDate(endDate)
  };
});

export default months;