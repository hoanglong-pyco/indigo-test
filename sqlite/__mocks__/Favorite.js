const db = [];
export const insert = person =>
  new Promise((next, reject) => {
    const row = { usename: person.username, data: JSON.stringify(person) };
    db.push(row);
    next();
  });

export const remove = username =>
  new Promise((next, reject) => {
    next();
  });

export const persons = () =>
  new Promise((next, reject) => {
    next(db);
  });
