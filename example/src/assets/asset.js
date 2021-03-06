const oneOcean = '1000000000000000000'
const free = '0'

const asset = {
  base: {
    author: 'Mario',
    categories: ['image'],
    checksum: '',
    copyrightHolder: 'Unknown',
    dateCreated: '2012-02-01T10:55:11Z',
    description: 'EXAMPLE ONLY ',
    files: [
      {
        checksum: '2bf9d229d110d1976cdf85e9f3256c7f',
        checksumType: 'MD5',
        compression: 'zip',
        contentLength: 12057507,
        contentType: 'application/zip',
        encoding: 'UTF-8',
        index: 0,
        url:
          'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/training.zip'
      },
      {
        checksum: '354d19c0733c47ef3a6cce5b633116b0',
        checksumType: 'MD5',
        contentLength: 928,
        contentType: 'text/txt',
        index: 1,
        resourceId: 'test',
        url:
          'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/monkey_labels.txt',
      },
      {
        index: 2
      }
    ],
    inLanguage: 'en',
    license: 'CC0: Public Domain',
    links: [
      {
        name: 'example model',
        url:
          'https://drive.google.com/open?id=1uuz50RGiAW8YxRcWeQVgQglZpyAebgSM'
      },
      {
        name: 'example code',
        type: 'example code',
        url: 'https://github.com/slothkong/CNN_classification_10_monkey_species'
      },
      {
        name: 'n5151.jpg',
        type: 'discovery',
        url:
          'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/discovery/n5151.jpg',
      },
      {
        name: 'sample.zip',
        type: 'sample',
        url:
          'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/links/sample/sample.zip',
      }
    ],
    name: 'Big Kahuna Burgers Stores locations',
    price: oneOcean,
    tags: ['image data', 'classification', 'animals'],
    type: 'dataset',
    workExample: 'image path, id, label',
  }
}

export default asset
