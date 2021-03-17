export default (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            name: 'Lob Lee',
            amount: 15000,
            date: '2020-02-24',
            year: 20,
          },
          {
            id: 2,
            name: 'John Seek',
            amount: 3000,
            date: '2020-02-25',
            year: 21,
          },
          {
            id: 3,
            name: 'Harry Smith',
            amount: 21000.45,
            date: '2020-02-26',
            year: 22,
          },
          {
            id: 4,
            name: 'Alex Morphy',
            amount: 150.99,
            date: '2020-02-27',
            year: 23,
          },
          {
            id: 5,
            name: 'Ben Gold',
            amount: 10000000,
            date: '2020-02-28',
            year: 24,
          },
          {
            id: 6,
            name: 'Tim Black',
            amount: 0,
            date: '2020-02-28',
            year: 25,
          },
          {
            id: 7,
            name: 'Jimmy Elephant',
            amount: 7503.60,
            date: '2020-02-30',
            year: 26,
          },
        ],
      });
    }, 1500);
  });
};
