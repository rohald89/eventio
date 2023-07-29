export default function handler(req, res) {
  res.status(200).json({
    todos: [
      { id: 1, title: "Buy Milk" },
      { id: 2, title: "Buy Eggs" },
      { id: 3, title: "Buy Bread" },
    ],
  });
}
