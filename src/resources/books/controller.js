const db = require("../../utils/database");

const createOne = async (req, res) => {
  console.log("Books Router [CREATE]", { body: req.body });

  const bookToCreate = {
    ...req.body
  };

  const createOneSQL = `
    INSERT INTO books
      (title, author, type, topic, publicationDate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const { title, author, type, topic, publicationDate } = bookToCreate;

  try {
    const result = await db.query(createOneSQL, [
      title,
      author,
      type,
      topic,
      publicationDate
    ]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res)  => {
console.log("Books Router [READ]", {body: req.body})

const getAllSQL = `
SELECT *
FROM books
`;
try {

const result = await db.query(getAllSQL)
res.json ({data: result.rows})
} catch (error) {
    console.error ("[ERROR getAll: ", {error: error.message});

    res.status(500).json({ error: error.message });
  }
}

const getOneById = async (req, res) => {
console.log("Books Router [READ]: ", {body:req.body})

const idToGet = req.params.id
console.log("idToGet: ", req.params.id)

const getOneByIdSQL = `
SELECT *
FROM products
WHERE id = $1;
`
try {

  const result = await db.query(getOneByIdSQL, [idToGet])
  res.json ({data: result.rows[0]})
  } catch (error) {
      console.error ("[ERROR getOneById: ", {error: error.message});
  
      res.status(500).json({ error: error.message });
    }
}

 module.exports = {
  createOne,
  getAll,
  getOneById
};
