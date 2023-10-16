import moment from "moment";

function getMinDate() {
  return moment("2000-01-01");
}

function getMaxDate() {
  return moment();
}

export { getMinDate, getMaxDate };
