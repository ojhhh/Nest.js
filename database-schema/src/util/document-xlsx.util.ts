import { createConnection, ConnectionOptions } from 'typeorm';
import * as XLSX from 'xlsx';
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

  const workbook = XLSX.utils.book_new();

  for (const table of tables) {
    const tableName = table.TABLE_NAME;

    // 컬럼 정보 가져오기
    const columns = await queryRunner.query(`
      SELECT COLUMN_NAME, COLUMN_COMMENT, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${connectionOptions.database}' AND TABLE_NAME = '${tableName}'
    `);

    const sheetData = [
      ['Table Name', tableName], // 테이블 명 추가
      [], // 빈 행 추가
      [
        'Column Name',
        'Data Type',
        'Not Null',
        'PK',
        'FK',
        'IDX',
        'default',
        'comment',
        '제약 조건',
      ],
    ];

    columns.forEach((column, index) => {
      sheetData.push([
        column.COLUMN_NAME,
        column.COLUMN_TYPE,
        column.IS_NULLABLE === 'YES' ? 'N' : 'Y',
        column.COLUMN_KEY === 'PRI' ? 'Y' : 'N',
        column.COLUMN_KEY === 'MUL' ? 'Y' : 'N',
        column.COLUMN_KEY === 'UNI' ? 'Y' : 'N',
        column.COLUMN_DEFAULT || '',
        column.COLUMN_COMMENT || '',
        column.EXTRA,
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 열 너비 자동 조정 (최소 너비 추가)
    const columnWidths = sheetData[2].map((_, colIndex) => ({
      wch: Math.max(
        ...sheetData.map((row) =>
          row[colIndex] ? row[colIndex].toString().length + 2 : 10,
        ),
      ),
    }));

    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
  }

  const outputPath = path.join(__dirname, 'database_documentation.xlsx');
  XLSX.writeFile(workbook, outputPath);

  console.log(`Excel documentation has been saved to ${outputPath}`);

  await queryRunner.release();
  await connection.close();
}

generateDocumentation().catch((error) => console.error(error));
