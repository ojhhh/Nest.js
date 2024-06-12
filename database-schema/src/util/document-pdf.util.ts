import { createConnection, ConnectionOptions } from 'typeorm';
import * as fs from 'fs';
import * as pdf from 'html-pdf';

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

  let html = `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; table-layout: auto; word-wrap: break-word; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; font-size: 12px; }
      td { max-width: 200px; word-break: break-all; font-size: 10px; }
      .table-container { page-break-after: always; }
    </style>
  </head>
  <body>
    <h1>Database Documentation</h1>`;

  for (const table of tables) {
    const tableName = table.TABLE_NAME;

    // 컬럼 정보 가져오기
    const columns = await queryRunner.query(`
      SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_COMMENT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${connectionOptions.database}' AND TABLE_NAME = '${tableName}'
    `);

    html += `<div class="table-container"><h2>Table: ${tableName}</h2>`;
    html += `<table>
      <tr>
        <th>Col #</th>
        <th>Column Name</th>
        <th>Data Type</th>
        <th>Key</th>
        <th>Null</th>
        <th>Identity</th>
        <th>Default</th>
        <th>Comments</th>
      </tr>`;

    columns.forEach((column, index) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${column.COLUMN_NAME}</td>
        <td>${column.DATA_TYPE}</td>
        <td>${column.COLUMN_KEY ? 'Y' : 'N'}</td>
        <td>${column.IS_NULLABLE === 'YES' ? 'Y' : 'N'}</td>
        <td>${column.EXTRA.includes('auto_increment') ? 'Y' : 'N'}</td>
        <td>${column.COLUMN_DEFAULT || ''}</td>
        <td>${column.COLUMN_COMMENT || ''}</td>
      </tr>`;
    });

    html += `</table></div>`;
  }

  html += `</body></html>`;

  // HTML을 PDF로 변환
  const options = { format: 'A4', orientation: 'landscape', border: '10mm' }; // PDF 옵션 조정
  pdf.create(html, options).toFile('database_documentation.pdf', (err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });

  await queryRunner.release();
  await connection.close();
}

generateDocumentation().catch((error) => console.error(error));
