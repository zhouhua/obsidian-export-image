import {jpg, png} from './tiny';

async function tester(image: string) {
  try {
    const blob = await (await fetch(image)).blob();
    const data: ClipboardItem[] = [];
    data.push(
      new ClipboardItem({
        [blob.type]: blob,
      }),
    );
    await navigator.clipboard.write(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const cache: Partial<Record<FileFormat, Promise<boolean>>> = {
  pdf: Promise.resolve(false),
};

async function isCopiable(type: FileFormat) {
  if (type in cache) {
    return cache[type];
  }

  if (type === 'jpg') {
    cache[type] = tester(jpg);
    return cache[type];
  }

  const result = tester(png);
  cache.png0 = result;
  cache.png1 = result;
  return result;
}

export default isCopiable;
