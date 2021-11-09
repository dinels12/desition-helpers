import GenerateFiles from '../src';
// import GenerateFiles from '../dist';

const genInterfacesFiles = new GenerateFiles({
  routePath: './**/interfaces/**/*.interface.ts',
  savePath: __dirname + '/app/interfaces',
  suffixStart: 'I',
  typeSuffix: '.ts',
});

const genModelsFiles = new GenerateFiles({
  routePath: './**/models/**/*.model.ts',
  savePath: __dirname + '/app/models',
  suffixEnd: 'Model',
  typeSuffix: '.ts',
});

const genRoutesFiles = new GenerateFiles({
  routePath: './**/routes/**/*.routes.ts',
  savePath: __dirname + '/config',
  suffixEnd: 'Routes',
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
      './test/app/',
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
      './test/app/',
      files
    );
    expect(res).toBe(true);
  }, 20000);
});

describe('get routes files path', () => {
  let files: string[] = [];
  it('files path', async () => {
    files = await genRoutesFiles.inspectFiles();
    expect(files).toBeInstanceOf(Array);
  });
  it('generate routes output', async () => {
    const res = await genRoutesFiles.generateRoutes(
      'routes.ts',
      './test/',
      files,
      '/api/v1'
    );
    expect(res).toBe(true);
  }, 20000);
});
