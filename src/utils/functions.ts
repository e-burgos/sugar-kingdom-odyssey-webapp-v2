export const handleLink = (url: string, target: string) => {
  window.open(url, target || "_blank", "noopener");
};

export const handleTournamentStatus = (status: number) => {
  switch (status) {
    case 0:
      return "OPEN";
    case 1:
      return "Pending Payment";
    case 2:
      return "PAID";
    default:
      return "OPEN";
  }
};

export const handleRemainingTime = (time: string) => {
  const [days, hours, minutes] = time.split(":");
  return `${days.slice(0, 2)}d ${hours.slice(0, 2)}h ${minutes.slice(0, 2)}m`;
};
