import GenerateFiles from '../src';
// import GenerateFiles from '../dist';

const genInterfacesFiles = new GenerateFiles({
  routePath: './**/interfaces/**/*.interface.ts',
  savePath: __dirname + '/Interfaces',
  suffixStart: 'I',
  typeSuffix: '.ts',
});

const genModelsFiles = new GenerateFiles({
  routePath: './**/models/**/*.model.ts',
  savePath: __dirname + '/Models',
  suffixEnd: 'Model',
  typeSuffix: '.ts',
});

describe('get interface files path', () => {
  let files: string[] = [];
  it('interface files path', async () => {
    files = await genInterfacesFiles.inspectFiles();
    expect(files).toBeInstanceOf(Array);
  });
  it('generate interfaces output', async () => {
    const res = await genInterfacesFiles.generateInterfaces(
      'index.ts',
      './test/',
      files
    );
    expect(res).toBe(true);
  }, 20000);
});

describe('get model files path', () => {
  let files: string[] = [];
  it('files path', async () => {
    files = await genModelsFiles.inspectFiles();
    expect(files).toBeInstanceOf(Array);
  });
  it('generate models output', async () => {
    const res = await genModelsFiles.generateModels(
      'index.ts',
      './test/',
      files
    );
    expect(res).toBe(true);
  }, 20000);
});
