export const random = () =>
  fetch("https://randomuser.me/api/0.4/?randomapi")
    .then(rs => rs.json())
    .then(({ results: [{ user }] }) => user);
