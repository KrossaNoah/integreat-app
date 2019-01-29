// @flow

import { CategoriesMapModel, CityModel, LanguageModel } from '@integreat-app/integreat-api-client'
import DataContext from './DataContext'
import type { ResourceCacheType } from './ResourceCacheType'

class MemoryDatabase {
  dataDirectory: string
  context: DataContext

  _cities: Array<CityModel>
  _categoriesMap: CategoriesMapModel
  _languages: Set<LanguageModel>
  _resourceCache: ResourceCacheType

  constructor (dataDirectory: string) {
    this.dataDirectory = dataDirectory
  }

  loadCities (cities: Array<CityModel>) {
    this._cities = cities
  }

  changeContext (
    context: DataContext,
    categoriesMap: CategoriesMapModel, languages: Set<LanguageModel>, resourceCache: ResourceCacheType
  ) {
    this.context = context
    this._resourceCache = resourceCache
    this._categoriesMap = categoriesMap
    this._languages = languages
  }

  hasContext (): boolean {
    return !!this.context
  }

  get cities (): Array<CityModel> {
    return this._cities
  }

  get categoriesMap (): CategoriesMapModel {
    return this._categoriesMap
  }

  get languages (): Set<LanguageModel> {
    return this._languages
  }

  get resourceCache (): ResourceCacheType {
    return this._resourceCache
  }
}

export default MemoryDatabase
