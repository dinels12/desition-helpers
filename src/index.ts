import glob from 'glob-promise';
import fs from 'fs/promises';
import shell from 'shelljs';

interface GenerateFilesData {
  routePath: string;
  savePath: string;
  typeSuffix: string;
  suffixEnd?: string;
  suffixStart?: string;
}

class GenerateFiles {
  private routePath: string;
  private savePath: string;
  private typeSuffix: string;
  private suffixEnd?: string;
  private suffixStart?: string;

  constructor({
    routePath,
    savePath,
    suffixStart,
    suffixEnd,
    typeSuffix,
  }: GenerateFilesData) {
    this.routePath = routePath;
    this.savePath = savePath;
    this.suffixStart = suffixStart;
    this.suffixEnd = suffixEnd;
    this.typeSuffix = typeSuffix;
  }

  async inspectFiles() {
    return glob(this.routePath);
  }
  async generateInterfaces(name: string, exclude: string, files: string[]) {
    shell.mkdir('-p', this.savePath);
    const savePath = this.savePath + `/${name}`;
    const modulesNames: string[] = [];
    const rows = files.map(line => {
      let row = `import NAME from "LOCATION";`;
      const index = line.lastIndexOf('/');

      const name = line
        .slice(index + 1)
        .replace(`.interface${this.typeSuffix}`, '');
      const formatedName = `${this.suffixStart ? this.suffixStart : ''}${
        this.suffixStart
          ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
          : name
      }${this.suffixEnd ? this.suffixEnd : ''}`;
      row = row.replace(
        /LOCATION/,
        line.replace(exclude, '../').replace(this.typeSuffix, '')
      );
      row = row.replace(/NAME/, formatedName);
      modulesNames.push(formatedName);
      return row;
    });
    rows.push(`export { ${modulesNames.join(', ')} };`);
    await fs.writeFile(savePath, rows.join('\n'));
    return true;
  }
  async generateModels(name: string, exclude: string, files: string[]) {
    shell.mkdir('-p', this.savePath);
    const savePath = this.savePath + `/${name}`;
    const modulesNames: string[] = [];
    const rows = files.map(line => {
      let row = `import NAME from "LOCATION";`;
      const index = line.lastIndexOf('/');

      const name = line
        .slice(index + 1)
        .replace(`.model${this.typeSuffix}`, '');
      const formatedName = `${this.suffixStart ? this.suffixStart : ''}${
        this.suffixStart
          ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
          : name
      }${this.suffixEnd ? this.suffixEnd : ''}`;
      row = row.replace(
        /LOCATION/,
        line.replace(exclude, '../').replace(this.typeSuffix, '')
      );
      row = row.replace(/NAME/, formatedName);
      modulesNames.push(formatedName);
      return row;
    });
    rows.push(`export { ${modulesNames.join(', ')} };`);
    await fs.writeFile(savePath, rows.join('\n'));
    return true;
  }
}

export default GenerateFiles;
