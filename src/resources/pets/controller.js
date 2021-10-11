const db = require("../../utils/database");

const createOne = async (req, res) => {
  console.log("Pets Router [CREATE]", { body: req.body });

  const petToCreate = {
    ...req.body
  };

  const createOneSQL = `
    INSERT INTO pets
      (name, age, type, microchip)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  const { name, age, type, microchip } = petToCreate;

  try {
    const result = await db.query(createOneSQL, [name, age, type, microchip]);

    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error("[ERROR] createOne: ", { error: error.message });

    res.status(500).json({ error: error.message });
  }
};
const getAll = async (req, res)  => {
  console.log("Pets Router [READ]", {body: req.body})
  
  const getAllSQL = `
  SELECT *
  FROM pets
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
  console.log("Pets Router [READ]: ", {body:req.body})
  
  const idToGet = req.params.id
  console.log("idToGet: ", req.params.id)
  
  const getOneByIdSQL = `
  SELECT *
  FROM pets
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
