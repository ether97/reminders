import getReminders from "../actions/getReminders";

export default async function getServerSideProps() {
  const reminders = await getReminders();

  return reminders || null;
}
