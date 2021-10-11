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
FROM books
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

const getByFiction = async (req, res) => {
console.log("Books Router [READ]: ", {body:req.body})

const fictionToGet = req.params.type
console.log("fictionToGet: ", req.params.type)

const getByFictionSQL = `
SELECt * FROM books where type='fiction'
`
try {
  
  const result = await db.query(getByFictionSQL, [fictionToGet])
  res.json ({data: result.rows})
  } catch (error) {
      console.error ("[ERROR getOneByFiction: ", {error: error.message});
  
      res.status(500).json({ error: error
        
        .message });
    }
}

const getByFictionTopic = async (req, res) => {

  const { bookType } = req.params
  const { topic } = req.query

  let getByFictionTopicSQL = `
  SELECT * FROM books WHERE type = $1
  `
  const ParamsSQL = [bookType]

  if (topic) {
    getByFictionTopicSQL += `AND topic = $2`
    ParamsSQL.push(topic)
  }
  try {
    const result = await db.query(getByFictionTopicSQL, [ParamsSQL])
    res.json({data: result.rows})
  } catch (error) {
    console.error("[ERROR getByFictionTopic: ", {error:error.message})

    res.status(500).json({error:error.message})
  }
}
 module.exports = {
  createOne,
  getAll,
  getOneById,
  getByFiction,
  getByFictionTopic
};
