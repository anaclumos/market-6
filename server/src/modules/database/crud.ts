import DataStore from 'nedb'

export function makeCreateFunction<T>(store: DataStore<T>) {
  return (doc: T): Promise<[Error, T]> => {
    return new Promise((resolve) => {
      store.insert<T>(doc, (err, doc) => {
        resolve([err, doc])
      })
    })
  }
}

export function makeFindFunction<T>(store: DataStore<T>) {
  return (
    query: {
      [K in keyof T]?: T[K]
    }
  ): Promise<[Error, T[]]> => {
    return new Promise((resolve) => {
      store.find(query, (err, docs) => {
        resolve([err, docs])
      })
    })
  }
}