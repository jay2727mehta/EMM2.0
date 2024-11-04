const { connectToDatabase, sql } = require("./mysqlcon");

async function fetchData() {
  try {
    const pool = await connectToDatabase();

    if (!pool || !pool.request) {
      throw new Error("Connection pool or request method is undefined");
    }
    const result = await pool.request().query(`SELECT TOP 5 
    ACCount, 
    ACDate 
  FROM 
    AssociateCount 
  WHERE 
    ACDate BETWEEN DATEADD(day, -6, CAST(GETDATE() AS date)) AND CAST(GETDATE() AS date)
  ORDER BY 
    ACDate DESC;`); // Adjust query as needed
    const TotalEmp = result.recordset;
    const formattedData = TotalEmp.map((item) => {
      const formattedDate = new Date(item.ACDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return {
        ...item,
        ACDate: formattedDate,
      };
    });

    return formattedData;
  } catch (err) {
    console.error("Error executing employee data from DL : ", err.message);
  }
}

module.exports = {
  fetchData,
};
