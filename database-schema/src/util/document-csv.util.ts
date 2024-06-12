import { createConnection, ConnectionOptions } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function generateDocumentation() {
  const connection = await createConnection(connectionOptions);
  const queryRunner = connection.createQueryRunner();

  // 테이블 목록 가져오기
  const tables = await queryRunner.query(`
    SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = '${connectionOptions.database}'
  `);

  let csvContent =
    'Table Name,Col #,Column Name,Data Type,Key,Null?,Identity,Default,Comments\n';

  for (const table of tables) {
    const tableName = table.TABLE_NAME;

    // 컬럼 정보 가져오기
    const columns = await queryRunner.query(`
      SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${connectionOptions.database}' AND TABLE_NAME = '${tableName}'
    `);

    columns.forEach((column, index) => {
      csvContent += `"${tableName}",${index + 1},"${column.COLUMN_NAME}","${column.DATA_TYPE}","${column.COLUMN_KEY ? 'Y' : 'N'}","${column.IS_NULLABLE === 'YES' ? 'Y' : 'N'}","${column.EXTRA.includes('auto_increment') ? 'Y' : 'N'}","${column.COLUMN_DEFAULT || ''}","${column.COLUMN_COMMENT || ''}"\n`;
    });
  }

  const outputPath = path.join(__dirname, 'database_documentation.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');

  console.log(`CSV documentation has been saved to ${outputPath}`);

  await queryRunner.release();
  await connection.close();
}

generateDocumentation().catch((error) => console.error(error));
