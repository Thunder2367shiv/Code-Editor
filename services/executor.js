// services/executor.js
import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
import path from 'path';

export const executeCode = async (code, language) => {
  const tempId = uuid();
  const filename = `temp_${tempId}`;

  let filePath, cmd;
 
  switch (language) {
    case 'cpp':
      filePath = path.resolve(`./temp/${filename}.cpp`);
      await writeFile(filePath, code);
      cmd = `g++ ${filePath} -o ./temp/${filename} && ./temp/${filename}`;
      break;

    case 'python':
      filePath = path.resolve(`./temp/${filename}.py`);
      await writeFile(filePath, code);
      cmd = `python3 ${filePath}`;
      break;

    case 'javascript':
      filePath = path.resolve(`./temp/${filename}.js`);
      await writeFile(filePath, code);
      cmd = `node ${filePath}`;
      break;

    default:
      throw new Error('Unsupported language');
  }

  return new Promise((resolve, reject) => {
    exec(cmd, { timeout: 5000 }, async (err, stdout, stderr) => {
      try {
        await unlink(filePath);
        if (language === 'cpp') await unlink(`./temp/${filename}`);
      } catch (e) {
        console.error('Error cleaning up:', e.message);
      }

      if (err) return reject(stderr || err.message);
      return resolve(stdout);
    });
  });
};
