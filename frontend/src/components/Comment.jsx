const Comment = ({ comment }) => {
  const dateFormatter = (timestamp) => {
    const myDate = new Date(timestamp);

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    return myDate.toLocaleString("en-GB", options).replace(",", "");
  };

  return (
    <>
      <div className="p-2 sm:p-3 rounded-lg duration-200 transition-all">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold ">@{comment.userId}</p>
          <p className="text-sm mt-2 sm:mt-0 sm:text-base">
            {dateFormatter(comment.timestamp)}
          </p>
        </div>
        <p className="text-sm sm:text-base">{comment.text}</p>
      </div>
    </>
  );
};

export default Comment;
