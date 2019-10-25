import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(
  "indigo-test-react",
  "1.0",
  "Indigo test react native",
  200000
);

db.transaction(tx => {
  tx.executeSql(
    "create table if not exists favorite (username varchar primary key not null, data text);"
  );
});

export const insert = person =>
  new Promise((next, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "insert into favorite (username, data) values (?, ?)",
        [person.username, JSON.stringify(person)],
        next,
        reject
      );
    });
  });

export const remove = username =>
  new Promise((next, reject) => {
    console.log(username)
    db.transaction(tx => {
      tx.executeSql(
        `delete from favorite where username='${username}'`,
        [],
        next,
        reject
      );
    });
  });

export const persons = () =>
  new Promise((next, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from favorite",
        [],
        (_, { rows }) => next(rows._array.map(({ data }) => JSON.parse(data))),
        reject
      );
    });
  });

