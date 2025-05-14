const dateFormats = {
  "YYYY/MM/DD": {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
  "DD/MM/YYYY": {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
  YYYY: {
    year: "numeric",
  },
  "MMM D, YYYY": {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  "MMM YYYY": {
    year: "numeric",
    month: "long",
  },
};

export function formatDate(date, format, separator = "/", market = "en-GB") {
  if (!date) return null;
  const standardisedDate = new Date(date);
  const formattedDate = Intl.DateTimeFormat(market, dateFormats[format]).format(
    standardisedDate
  );

  if (separator !== "/") {
    return formattedDate.replace(/\//g, separator);
  }
  return formattedDate;
}

export function getDateStatus(startDate, endDate, start = true) {
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);
  const today = new Date();

  if (formattedStartDate < today) {
    if (endDate && formattedEndDate < today) {
      return start ? "Past Employee" : "Terminated";
    } else if (endDate && formattedEndDate > today) {
      return start ? "Currently Employed" : "To Be Terminated";
    } else if (!endDate) {
      return "Currently Employed";
    }
  } else if (formattedStartDate > today) {
    return "Employeed Soon";
  }
}
